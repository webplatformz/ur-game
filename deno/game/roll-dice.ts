import { DiceValue } from "../shared/models/dice-value.model.ts";
import { DiceValues } from "../shared/models/dice-values.model.ts";

export function rollDice(): DiceValues {
  const roll = () => Math.round(Math.random()) as DiceValue;
  return [roll(), roll(), roll(), roll()];
}

export function diceRollSum(diceRoll: DiceValues): number {
  return diceRoll.reduce((acc, val) => acc + val, 0 as number);
}
