import { GameState } from "../shared/models/game-state.model.ts";

export function getNewPlayerBoard(): number[] {
  const board = new Array(16).fill(0);
  board[0] = 7;
  return board;
}

export function getCurrentPlayerBoards(
  gameState: GameState,
): { currentPlayerBoard: number[]; opponentPlayerBoard: number[] } {
  const { boardDark, boardLight, currentPlayer } = gameState;
  return currentPlayer === "light"
    ? { currentPlayerBoard: boardLight, opponentPlayerBoard: boardDark }
    : { currentPlayerBoard: boardDark, opponentPlayerBoard: boardLight };
}
