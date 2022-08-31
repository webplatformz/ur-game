import { PlayerColor } from "./game-state.model.ts";

export interface GameSession {
  sessionId: string;
  playerColor: PlayerColor;
}
