import { GameContext } from "../shared/models/game-context.model.ts";
import { getBoardConfig } from "./board.ts";
import { getNewPlayerBoard } from "./player-board.ts";

export function getInitialGameContext(): GameContext {
  return {
    boardDark: getNewPlayerBoard(),
    boardLight: getNewPlayerBoard(),
    currentPlayer: "dark",
    currentDiceRoll: [0, 0, 0, 0],
    currentValidTargets: [],
    boardConfig: getBoardConfig(),
    state: "initial",
    score: { dark: 0, light: 0 },
  };
}
