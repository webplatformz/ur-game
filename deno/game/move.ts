import { GameState } from "../shared/models/game-state.model.ts";
import { isSafeField } from "./board.ts";
import { getNextPlayer } from "./player.ts";

export function moveToTargetIdx(
  gameState: GameState,
  targetIdx: number,
  diceValue: number,
): GameState {
  const { currentPlayer } = gameState;
  const currTokenIdx = targetIdx - diceValue;

  const isCurrentPlayerWhite = currentPlayer === "white";
  const { currentPlayerBoard, opponentPlayerBoard } = getPlayerBoards(
    gameState,
  );

  const updatedCurrPlayerBoard = moveToken(
    currentPlayerBoard,
    currTokenIdx,
    targetIdx,
  );
  const updatedOpponentBoard = updateOpponentBoard(
    opponentPlayerBoard,
    targetIdx,
  );
  const nextPlayer = getNextPlayer(gameState.currentPlayer, targetIdx);

  return {
    ...gameState,
    currentPlayer: nextPlayer,
    ...(isCurrentPlayerWhite
      ? { boardWhite: updatedCurrPlayerBoard }
      : { boardBlack: updatedCurrPlayerBoard }),
    ...(isCurrentPlayerWhite
      ? { boardBlack: updatedOpponentBoard }
      : { boardWhite: updatedOpponentBoard }),
  };
}

function getPlayerBoards(
  gameState: GameState,
): { currentPlayerBoard: number[]; opponentPlayerBoard: number[] } {
  const { boardBlack, boardWhite, currentPlayer } = gameState;
  return currentPlayer === "white"
    ? { currentPlayerBoard: boardWhite, opponentPlayerBoard: boardBlack }
    : { currentPlayerBoard: boardBlack, opponentPlayerBoard: boardWhite };
}

function moveToken(board: number[], currTokenIdx: number, targetIdx: number) {
  board[currTokenIdx]--;
  board[targetIdx]++;
  return board;
}

function updateOpponentBoard(board: number[], targetIdx: number) {
  if (board[targetIdx] === 1 && !isSafeField(targetIdx)) {
    board[targetIdx] = 0;
  }
  return board;
}
