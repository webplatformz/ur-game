import { GameContext } from "../shared/models/game-context.model.ts";
import { getCurrentPlayerBoards } from "./player-board.ts";

export function isValidMove(
  gameContext: GameContext,
  targetIdx: number,
  diceValue: number,
): boolean {
  if (diceValue === 0) {
    return true;
  }
  const { currentPlayerBoard, opponentPlayerBoard } = getCurrentPlayerBoards(
    gameContext,
  );
  const targetField = gameContext.boardConfig[targetIdx];

  const hasTargetCapacity =
    currentPlayerBoard[targetIdx] < targetField.capacity &&
    (opponentPlayerBoard[targetIdx] === 0 || !targetField.isBattleField);
  const hasReachedEnd = targetIdx === gameContext.boardConfig.length - 1;
  const isCapturableField = opponentPlayerBoard[targetIdx] !== 0 &&
    targetField.isBattleField && !targetField.isSafe;

  return isValidMoveInput(
    currentPlayerBoard,
    targetIdx,
    diceValue,
    gameContext.boardConfig.length,
  ) &&
    (
      hasTargetCapacity ||
      hasReachedEnd ||
      isCapturableField
    );
}

function isValidMoveInput(
  currentPlayerBoard: number[],
  targetIdx: number,
  diceValue: number,
  boardSize: number,
) {
  const hasTokenToMove = currentPlayerBoard[targetIdx - diceValue] > 0;
  const isTargetOnBoard = targetIdx >= 0 && targetIdx < boardSize;
  const isValidDiceValue = diceValue >= 0 && diceValue <= 4;
  return hasTokenToMove && isTargetOnBoard && isValidDiceValue;
}
