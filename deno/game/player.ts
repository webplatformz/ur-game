import { canRollAgainField } from "./board.ts";
import { PlayerColor } from "../shared/models/game-context.model.ts";

export function getNextPlayer(
  currentPlayer: PlayerColor,
  targetIdx: number,
) {
  return canRollAgainField(targetIdx)
    ? currentPlayer
    : (currentPlayer === "light" ? "dark" : "light");
}
