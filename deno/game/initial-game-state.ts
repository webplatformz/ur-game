import { getBoardConfig } from "../game/board.ts";
import { getNewPlayerBoard } from "../game/player-board.ts";
import { GameState } from "../shared/models/game-state.model.ts";

const initialGameState: GameState = {
  type: "gamestate",
  boardBlack: getNewPlayerBoard(),
  boardWhite: getNewPlayerBoard(),
  isFinished: false,
  currentPlayer: "black",
  boardConfig: getBoardConfig(),
};

export function getInitialGameState() {
  return initialGameState;
}