import { getInitialGameContext } from "../game/get-initial-game-context.ts";
import { getScore } from "../game/get-score.ts";
import { isFinished } from "../game/is-finished.ts";
import { isValidMove } from "../game/is-valid-move.ts";
import { getPossibleTargetFields, moveToTargetIdx } from "../game/move.ts";
import { diceRollSum, rollDice } from "../game/roll-dice.ts";
import { generateSessionId } from "../id-utils.ts";
import {
  GameContext,
  PlayerColor,
} from "../shared/models/game-context.model.ts";
import {
  ClientWebsocketMessages,
  ServerWebsocketMessages,
} from "../shared/models/message-types.model.ts";
import { Move } from "../shared/models/move.model.ts";
import { PlayerSession } from "./player-session.ts";

export class GameSession {
  public readonly sessionId = generateSessionId();
  public onCleanUp?: () => void;
  private readonly players: { [k in PlayerColor]?: PlayerSession } = {};
  private gameContext: GameContext = getInitialGameContext();

  constructor(socket: WebSocket) {
    this.addPlayer(socket);
  }

  addPlayer(socket: WebSocket) {
    const playerColor = this.players["dark"] ? "light" : "dark";
    const playerSession = new PlayerSession(
      socket,
    );
    playerSession.onOpen = () => {
      playerSession.send({
        type: "gamesession",
        sessionId: this.sessionId,
        playerColor,
      });
      const playerValues = Object.values(this.players);
      if (
        playerValues.length === 2 &&
        playerValues.every((value) => value.connected)
      ) {
        this.onLeaveGame();
        this.start()
          .then(() => console.log("Game finished"))
          .catch(() => console.error("Game errored"));
      }
    };
    playerSession.onClose = () => this.removePlayer(playerColor);
    this.players[playerColor] = playerSession;
  }

  removePlayer(playerColor: PlayerColor) {
    delete this.players[playerColor];
    if (Object.keys(this.players).length === 0) {
      this.onCleanUp?.();
    }
  }

  private disconnectPlayers() {
    Object.values(this.players).forEach((player) => {
      player.close();
    });
  }

  private broadcast(message: ServerWebsocketMessages) {
    Object.values(this.players).forEach((playerSession) =>
      playerSession.send(message)
    );
  }

  private onPlayerMessage(
    playerColor: PlayerColor,
    messageType: ClientWebsocketMessages["type"],
  ): Promise<ClientWebsocketMessages> {
    return this.players[playerColor]!.on(messageType);
  }

  async start(): Promise<void> {
    while (this.gameContext.state !== "finished") {
      try {
        this.gameContext.state = "roll";
        this.broadcast({ type: "gamecontext", ...this.gameContext });
        await this.onPlayerMessage(this.gameContext.currentPlayer, "roll");
        this.gameContext.currentDiceRoll = rollDice();
        const diceSum = diceRollSum(this.gameContext.currentDiceRoll);
        this.gameContext.currentValidTargets = getPossibleTargetFields(
          this.gameContext,
          diceSum,
        );
        this.gameContext.state = "move";
        this.broadcast({ type: "gamecontext", ...this.gameContext });
        if (this.gameContext.currentValidTargets.length === 0) {
          continue;
        }
        const { targetIdx } = await this.onPlayerMessage(
          this.gameContext.currentPlayer,
          "move",
        ) as Move;
        if (isValidMove(this.gameContext, targetIdx, diceSum)) {
          this.gameContext = moveToTargetIdx(
            this.gameContext,
            targetIdx,
            diceSum,
          );
        }
        if (isFinished(this.gameContext)) {
          this.gameContext.state = "finished";
        }
        this.gameContext.score = getScore(this.gameContext);
      } catch (err) {
        console.error(err.message);
        continue;
      }
      this.broadcast({ type: "gamecontext", ...this.gameContext });
    }
  }

  private onLeaveGame() {
    Object.keys(this.players).forEach((player: string) => {
      this.onPlayerMessage(player as PlayerColor, "leave").then(() => {
        if (Object.keys(this.players).length > 0) {
          this.broadcast({ type: "menu" });
          this.disconnectPlayers();
        }
      });
    });
  }
}
