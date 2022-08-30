import { GameState } from "../shared/models/game-state.model.ts";

export function isValidMove(
  gameState: GameState,
  target: number,
  diceValue: number,
): boolean {
  if (diceValue === 0) return true;
  const playerBoard = gameState.currentPlayer === "white"
    ? gameState.boardWhite
    : gameState.boardBlack;
  const opponentBoard = gameState.currentPlayer === "white"
    ? gameState.boardBlack
    : gameState.boardWhite;
  const targetField = gameState.boardConfig[target];
  const hasTokenToMove = playerBoard[target - diceValue] > 0;
  const targetOnBoard = target >= 0 && target < gameState.boardConfig.length;
  const validDiceValue = diceValue >= 0 && diceValue <= 4;
  const targetHasCapacity = playerBoard[target] < targetField.capacity &&
    (opponentBoard[target] === 0 || !targetField.isBattleField);
  const hasReachedEnd = target === gameState.boardConfig.length - 1;
  const capturable = opponentBoard[target] !== 0 && targetField.isBattleField &&
    !targetField.isSafe;
  return hasTokenToMove &&
    targetOnBoard &&
    validDiceValue &&
    (
      targetHasCapacity ||
      hasReachedEnd ||
      capturable
    );
}
