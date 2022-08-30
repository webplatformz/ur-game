import { GameSession } from "./game-session.ts";

let quickMatchWaitingPlayerSession: GameSession | undefined = undefined;
let sessions: GameSession[] = [];

function createCleanupSessionFunction(sessionId: string) {
  return () =>
    sessions = sessions.filter((session) => session.sessionId !== sessionId);
}

export function handleWebsocketConnection(
  socket: WebSocket,
  quickMatch: boolean,
  sessionId: string | null,
) {
  if (sessionId) {
    const foundSession = sessions.find((session) =>
      session.sessionId === sessionId
    );
    if (foundSession) {
      foundSession.addPlayer(socket);
    } else {
      throw new Error(`No game session with id ${sessionId} found`);
    }
  } else if (quickMatch) {
    if (quickMatchWaitingPlayerSession) {
      quickMatchWaitingPlayerSession.addPlayer(socket);
      sessions.push(quickMatchWaitingPlayerSession);
      quickMatchWaitingPlayerSession.onCleanUp = createCleanupSessionFunction(
        quickMatchWaitingPlayerSession.sessionId,
      );
      quickMatchWaitingPlayerSession = undefined;
    } else {
      quickMatchWaitingPlayerSession = new GameSession(socket);
      quickMatchWaitingPlayerSession.onCleanUp = () =>
        quickMatchWaitingPlayerSession = undefined;
    }
  } else {
    const gameSession = new GameSession(socket);
    gameSession.onCleanUp = createCleanupSessionFunction(gameSession.sessionId);
    sessions.push(gameSession);
  }
}
