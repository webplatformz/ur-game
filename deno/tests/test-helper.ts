import { getInitialGameState } from "../game/initial-game-state.ts";

export function getStateWithBoards(
  boardDark?: number[],
  boardLight?: number[],
) {
  return {
    ...getInitialGameState(),
    ...(boardDark != null && { boardDark }),
    ...(boardLight != null && { boardLight }),
  };
}
