import {GameSession} from "./play/game-session.ts";

let quickMatchWaitingPlayerSession: GameSession | undefined = undefined;
const sessions: GameSession[] = [];

export function handleWebsocketConnection(socket: WebSocket, quickMatch: boolean, sessionId?: string) {
    if (quickMatch) {
        if (quickMatchWaitingPlayerSession) {
            quickMatchWaitingPlayerSession.addPlayer(socket);
            sessions.push(quickMatchWaitingPlayerSession);
            quickMatchWaitingPlayerSession = undefined;
        } else {
            quickMatchWaitingPlayerSession = new GameSession(socket);
        }
    } else {
        if (sessionId) {
            const foundSession = sessions.find(session => session.sessionId === sessionId);
            if (foundSession) {
                foundSession.addPlayer(socket);
            } else {
                throw new Error(`No game session with id ${sessionId} found`);
            }
        } else {
            sessions.push(new GameSession(socket));
        }
    }
}
