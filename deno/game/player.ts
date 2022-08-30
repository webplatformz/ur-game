import { GameState } from "../shared/models/game-state.model.ts";
import { canRollAgainField } from "./board.ts";

export function getNextPlayer(
  currentPlayer: "white" | "black",
  targetIdx: number,
) {
  return canRollAgainField(targetIdx)
    ? currentPlayer
    : (currentPlayer === "white" ? "black" : "white");
}
