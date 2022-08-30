import { GameState } from "../shared/models/game-state.model.ts";
import { DiceRoll } from "../shared/models/dice-roll.model.ts";
import { rollDice } from "./roll-dice.ts";
import { getNewPlayerBoard } from "./player-board.ts";
import { getBoardConfig } from "./board.ts";

const getDefaultGameState = (): GameState => ({
  boardWhite: getNewPlayerBoard(),
  boardBlack: getNewPlayerBoard(),
  currentPlayer: "black",
  isFinished: false,
  boardConfig: getBoardConfig(),
});

export class GameController {
  private readonly gameState: GameState = getDefaultGameState();

  rollForPlayer(): DiceRoll {
    const rollValues = rollDice();
    return {
      values: rollValues,
      // TODO replace with real thing
      validTargets: [] as number[],
    };
  }
}
