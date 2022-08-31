import { PlayerSession } from "./player-session.ts";
import { generateSessionId } from "../id-utils.ts";
import { GameState, PlayerColor } from "../shared/models/game-state.model.ts";
import { getScore } from "../game/get-score.ts";
import { getInitialGameState } from "../game/initial-game-state.ts";
import {
  ClientWebsocketMessages,
  ServerWebsocketMessages,
} from "../shared/models/message-types.model.ts";
import { diceRollSum, rollDice } from "../game/roll-dice.ts";
import { isValidMove } from "../game/is-valid-move.ts";
import { getPossibleTargetFields, moveToTargetIdx } from "../game/move.ts";
import { Move } from "../shared/models/move.model.ts";
import { isFinished } from "../game/is-finished.ts";

export class GameSession {
  public readonly sessionId = generateSessionId();
  public onCleanUp?: () => void;
  private readonly players: { [k in PlayerColor]?: PlayerSession } = {};
  private gameState: GameState = getInitialGameState();

  constructor(socket: WebSocket) {
    this.addPlayer(socket);
  }

  addPlayer(socket: WebSocket) {
    const playerColor = this.players["black"] ? "white" : "black";
    const playerSession = new PlayerSession(
      socket,
    );
    playerSession.onOpen = () => {
      playerSession.send({type: "gamesession", sessionId: this.sessionId});
      const playerValues =  Object.values(this.players);
      if (playerValues.length === 2 && playerValues.every(value => value.connected)) {
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
    while (!this.gameState.isFinished) {
      try {
        this.broadcast({ type: "gamestate", ...this.gameState });
        await this.onPlayerMessage(this.gameState.currentPlayer, "roll");
        const diceRoll = rollDice();
        const diceSum = diceRollSum(diceRoll);
        this.broadcast({
          type: "diceroll",
          values: diceRoll,
          validTargets: getPossibleTargetFields(this.gameState, diceSum),
        });
        const { targetIdx } = await this.onPlayerMessage(
          this.gameState.currentPlayer,
          "move",
        ) as Move;
        if (isValidMove(this.gameState, targetIdx, diceSum)) {
          this.gameState = moveToTargetIdx(this.gameState, targetIdx, diceSum);
        }
        this.gameState.isFinished = isFinished(this.gameState);
      } catch (err) {
        console.error(err.message);
        continue;
      }
      this.broadcast({ type: "score", ...getScore(this.gameState) });
    }
  }
}
