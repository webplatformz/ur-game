import { GameContext } from "../shared/models/game-context.model.ts";

export function getNewPlayerBoard(): number[] {
  const board = new Array(16).fill(0);
  board[0] = 7;
  return board;
}

export function getCurrentPlayerBoards(
  gameContext: GameContext,
): { currentPlayerBoard: number[]; opponentPlayerBoard: number[] } {
  const { boardDark, boardLight, currentPlayer } = gameContext;
  return currentPlayer === "light"
    ? { currentPlayerBoard: boardLight, opponentPlayerBoard: boardDark }
    : { currentPlayerBoard: boardDark, opponentPlayerBoard: boardLight };
}
