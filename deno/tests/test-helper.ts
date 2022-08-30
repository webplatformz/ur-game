import { GameState } from "../shared/models/game-state.model.ts";

const initialGameState: GameState = {
  type: "gamestate",
  boardBlack: getNewPlayerBoard(),
  boardWhite: getNewPlayerBoard(),
  isFinished: false,
  currentPlayer: "black",
};

export function getStateWithBoards(
  boardBlack?: number[],
  boardWhite?: number[],
) {
  return {
    ...initialGameState,
    ...(boardBlack != null && { boardBlack: boardBlack }),
    ...(boardWhite != null && { boardWhite: boardWhite }),
  };
}

export function getNewPlayerBoard() {
  const board = Array(16).fill(0);
  board[0] = 7;
  board[board.length - 1] = 7;
  return board;
}
