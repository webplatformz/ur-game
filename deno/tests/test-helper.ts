import { getInitialGameContext } from "../game/get-initial-game-context.ts";

export function getContextWithBoards(
  boardDark?: number[],
  boardLight?: number[],
) {
  return {
    ...getInitialGameContext(),
    ...(boardDark != null && { boardDark }),
    ...(boardLight != null && { boardLight }),
  };
}
