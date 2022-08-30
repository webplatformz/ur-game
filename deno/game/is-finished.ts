import { GameState } from "../shared/models/game-state.model.ts";

export function isFinished(gameState: GameState): boolean {
  const endIdx = gameState.boardConfig.length - 1;
  const noOfTokens = gameState.boardConfig[endIdx].capacity;
  return gameState.boardBlack[endIdx] === noOfTokens ||
    gameState.boardWhite[endIdx] === noOfTokens;
}
