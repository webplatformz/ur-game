import { PlayerSession } from "./player-session.ts";
import { generateSessionId } from "../id-utils.ts";
import { WebsocketMessages } from "../shared/models/message-types.model.ts";

export class GameSession {
  public readonly sessionId = generateSessionId();
  private playerSessions: PlayerSession[] = [];

  public onCleanUp?: () => void;

  constructor(socket: WebSocket) {
    this.addPlayer(socket);
  }

  addPlayer(socket: WebSocket) {
    const playerIndex = this.playerSessions.length;
    socket.onmessage = (evt) => this.onMessage(playerIndex, evt.data);
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

  private onMessage(playerIndex: number, message: WebsocketMessages) {
    switch (message.type) {
      // TODO do stuff
    }
    const player = this.playerSessions[playerIndex];
    player.connection.send(
      `Deno says: «Hello». Your session id is: ${this.sessionId}`,
    );
  }
}
