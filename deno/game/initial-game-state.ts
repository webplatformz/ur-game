import { GameState } from "../shared/models/game-state.model.ts";
import { getBoardConfig } from "./board.ts";
import { getNewPlayerBoard } from "./player-board.ts";

export function getInitialGameState(): GameState {
  return {
    boardBlack: getNewPlayerBoard(),
    boardWhite: getNewPlayerBoard(),
    isFinished: false,
    currentPlayer: "dark",
    boardConfig: getBoardConfig(),
  };
}
