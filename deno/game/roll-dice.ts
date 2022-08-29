import { DiceValue } from "../shared/models/dice-value.model.ts";

export function rollDice(): [DiceValue, DiceValue, DiceValue, DiceValue] {
    const roll = () => Math.round(Math.random()) as DiceValue;
    return [roll(), roll(), roll(), roll()];
}
