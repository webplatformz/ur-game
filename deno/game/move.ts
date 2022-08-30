import { GameState } from "../shared/models/game-state.model.ts";
import { isSafeField } from "./board.ts";
import { getNextPlayer } from "./player.ts";
import { getCurrentPlayerBoards } from "./player-board.ts";
import { isValidMove } from "./is-valid-move.ts";

export function moveToTargetIdx(
  gameState: GameState,
  targetIdx: number,
  diceValue: number,
): GameState {
  const { currentPlayer } = gameState;
  const currTokenIdx = targetIdx - diceValue;

  const isCurrentPlayerWhite = currentPlayer === "white";
  const { currentPlayerBoard, opponentPlayerBoard } = getCurrentPlayerBoards(
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

export function getPossibleTargetFields(gameState: GameState, diceValue: number){
  const { currentPlayerBoard } = getCurrentPlayerBoards(gameState);
  const possibleMoves = currentPlayerBoard
    .map((nrOfTokensOnField, idx) => ({ tokens: nrOfTokensOnField, fieldIdx: idx}))
    .filter(({ tokens, }) => tokens > 0)
    .filter(({ fieldIdx }) => isValidMove(gameState, fieldIdx + diceValue, diceValue))
    .map(({ fieldIdx }) => fieldIdx + diceValue);
  return possibleMoves;
}
