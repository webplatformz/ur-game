import { GameContext } from "../shared/models/game-context.model.ts";

export function isFinished(gameContext: GameContext): boolean {
  const endIdx = gameContext.boardConfig.length - 1;
  const noOfTokens = gameContext.boardConfig[endIdx].capacity;
  return gameContext.boardDark[endIdx] === noOfTokens ||
    gameContext.boardLight[endIdx] === noOfTokens;
}
