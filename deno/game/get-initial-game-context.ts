import { GameContext } from "../shared/models/game-context.model.ts";
import { getBoardConfig } from "./board.ts";
import { getNewPlayerBoard } from "./player-board.ts";

export function getInitialGameContext(): GameContext {
  return {
    boardDark: getNewPlayerBoard(),
    boardLight: getNewPlayerBoard(),
    isFinished: false,
    currentPlayer: "dark",
    boardConfig: getBoardConfig(),
  };
}
