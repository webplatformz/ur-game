import { getInitialGameState } from "../game/initial-game-state.ts";

export function getStateWithBoards(
  boardBlack?: number[],
  boardWhite?: number[],
) {
  return {
    ...getInitialGameState(),
    ...(boardBlack != null && { boardBlack: boardBlack }),
    ...(boardWhite != null && { boardWhite: boardWhite }),
  };
}
