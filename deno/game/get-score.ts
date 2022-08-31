import { GameContext } from "../shared/models/game-context.model.ts";
import { Score } from "../shared/models/score.model.ts";

export function getScore(gameContext: GameContext): Score {
  const endIdx = gameContext.boardConfig.length - 1;
  return {
    dark: gameContext.boardDark[endIdx],
    light: gameContext.boardLight[endIdx],
  };
}
