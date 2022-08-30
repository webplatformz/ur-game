import { PlayerSession } from "./player-session.ts";
import { generateSessionId } from "../id-utils.ts";
import { WebsocketMessages } from "../shared/models/message-types.model.ts";
import { GameController } from "../game/game-controller.ts";

export class GameSession {
  public readonly sessionId = generateSessionId();
  public onCleanUp?: () => void;
  private readonly gameController = new GameController();
  private playerSessions: PlayerSession[] = [];

  constructor(socket: WebSocket) {
    this.addPlayer(socket);
  }

  addPlayer(socket: WebSocket) {
    const playerIndex = this.playerSessions.length;
    socket.onmessage = (evt) =>
      this.onMessage(playerIndex, JSON.parse(evt.data));
    socket.onclose = () => this.removePlayer(socket);
    this.playerSessions.push({
      connection: socket,
    });
  }

  removePlayer(socket: WebSocket) {
    this.playerSessions = this.playerSessions.filter((playerSession) =>
      playerSession.connection !== socket
    );
    if (this.playerSessions.length === 0) {
      this.onCleanUp?.();
    }
  }

  sendMessageToPlayer(playerIndex: number, message: WebsocketMessages) {
    this.playerSessions[playerIndex].connection.send(JSON.stringify(message));
  }

  private onMessage(playerIndex: number, message: WebsocketMessages) {
    switch (message.type) {
      case "roll":
        const diceRoll = this.gameController.rollForPlayer();
        this.sendMessageToPlayer(playerIndex, {
          type: "diceroll",
          ...diceRoll,
        });
        break;
      case 'gamestate':
        break;
      case 'move':
        break;
      case 'players':
        break;
      case 'diceroll':
        break;
      case 'ready':
        break;
    }
  }
}
