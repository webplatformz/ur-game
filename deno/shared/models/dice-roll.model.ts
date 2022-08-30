// @ts-ignore deno style imports
import { DiceValue } from "./dice-value.model.ts";

export interface DiceRoll {
  values: [DiceValue, DiceValue, DiceValue, DiceValue];
  validTargets: number[];
}
