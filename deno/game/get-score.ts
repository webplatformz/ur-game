import { GameState } from "../shared/models/game-state.model.ts";
import { Score } from "../shared/models/score.model.ts";

export function getScore(gameState: GameState): Score {
  const endIdx = gameState.boardConfig.length - 1;
  return {
    dark: gameState.boardDark[endIdx],
    light: gameState.boardLight[endIdx],
  };
}
