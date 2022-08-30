import { DieValue } from "../shared/models/die-value.model.ts";
import { DiceValues } from "../shared/models/dice-values.model.ts";

export function rollDice(): DiceValues {
  const roll = () => Math.round(Math.random()) as DieValue;
  return [roll(), roll(), roll(), roll()];
}

export function diceRollSum(diceRoll: DiceValues): number {
  return diceRoll.reduce((acc, val) => acc + val, 0 as number);
}
