import { PlayerColor } from "./game-context.model.ts";

export interface GameSession {
  sessionId: string;
  playerColor: PlayerColor;
}
