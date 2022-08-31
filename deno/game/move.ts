import { GameContext } from "../shared/models/game-context.model.ts";
import { isSafeField } from "./board.ts";
import { getNextPlayer } from "./player.ts";
import { getCurrentPlayerBoards } from "./player-board.ts";
import { isValidMove } from "./is-valid-move.ts";

export function moveToTargetIdx(
  gameContext: GameContext,
  targetIdx: number,
  diceValue: number,
): GameContext {
  const { currentPlayer } = gameContext;
  const currTokenIdx = targetIdx - diceValue;

  const isCurrentPlayerLight = currentPlayer === "light";
  const { currentPlayerBoard, opponentPlayerBoard } = getCurrentPlayerBoards(
    gameContext,
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
  const nextPlayer = getNextPlayer(gameContext.currentPlayer, targetIdx);

  return {
    ...gameContext,
    currentPlayer: nextPlayer,
    ...(isCurrentPlayerLight
      ? { boardLight: updatedCurrPlayerBoard }
      : { boardDark: updatedCurrPlayerBoard }),
    ...(isCurrentPlayerLight
      ? { boardDark: updatedOpponentBoard }
      : { boardLight: updatedOpponentBoard }),
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

export function getPossibleTargetFields(
  gameContext: GameContext,
  diceValue: number,
) {
  const { currentPlayerBoard } = getCurrentPlayerBoards(gameContext);
  return currentPlayerBoard
    .map((nrOfTokensOnField, idx) => ({
      tokens: nrOfTokensOnField,
      fieldIdx: idx,
    }))
    .filter(({ tokens }) => tokens > 0)
    .filter(({ fieldIdx }) =>
      isValidMove(gameContext, fieldIdx + diceValue, diceValue)
    )
    .map(({ fieldIdx }) => fieldIdx + diceValue);
}
