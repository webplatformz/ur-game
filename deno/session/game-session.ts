import { PlayerSession } from "./player-session.ts";
import { generateSessionId } from "../id-utils.ts";
import { WsMessage } from "../shared/models/ws-message.model.ts";

export class GameSession {
  public readonly sessionId = generateSessionId();
  private readonly playerSessions: PlayerSession[] = [];

  constructor(socket: WebSocket) {
    this.addPlayer(socket);
  }

  addPlayer(socket: WebSocket) {
    const playerIndex = this.playerSessions.length;
    socket.onmessage = (evt) => this.onMessage(playerIndex, evt.data);
    this.playerSessions.push({
      connection: socket,
    });
  }

  private onMessage(playerIndex: number, message: WsMessage) {
    switch (message.type) {
      // TODO do stuff
    }
    const player = this.playerSessions[playerIndex];
    player.connection.send(
      `Deno says: «Hello». Your session id is: ${this.sessionId}`,
    );
  }
}
