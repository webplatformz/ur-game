import { DiceValues } from "./dice-values.model.ts";
import { Field } from "./field.model.ts";
import { GameState } from "./game-state.model.ts";
import { Score } from "./score.model.ts";

export type PlayerColor = "light" | "dark";

export interface GameContext {
  boardLight: number[];
  boardDark: number[];
  currentPlayer: PlayerColor;
  currentDiceRoll: DiceValues;
  currentValidTargets: number[];
  boardConfig: Field[];
  state: GameState;
  score: Score;
}
