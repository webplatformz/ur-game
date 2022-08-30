import { getBoardConfig } from "./board.ts";
import { getNewPlayerBoard } from "./player-board.ts";
import { GameState } from "../shared/models/game-state.model.ts";

const initialGameState: GameState = {
  boardBlack: getNewPlayerBoard(),
  boardWhite: getNewPlayerBoard(),
  isFinished: false,
  currentPlayer: "black",
  boardConfig: getBoardConfig(),
};

export function getInitialGameState() {
  return initialGameState;
}
