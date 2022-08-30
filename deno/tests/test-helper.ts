import { getBoardConfig } from "../game/board.ts";
import { getNewPlayerBoard } from "../game/player-board.ts";
import { GameState } from "../shared/models/game-state.model.ts";

const initialGameState: GameState = {
  boardBlack: getNewPlayerBoard(),
  boardWhite: getNewPlayerBoard(),
  isFinished: false,
  currentPlayer: "black",
  boardConfig: getBoardConfig(),
};

export function getStateWithBoards(
  boardBlack?: number[],
  boardWhite?: number[],
) {
  return {
    ...initialGameState,
    ...(boardBlack != null && { boardBlack: boardBlack }),
    ...(boardWhite != null && { boardWhite: boardWhite }),
  };
}
