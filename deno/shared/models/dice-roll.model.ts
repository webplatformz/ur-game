// @ts-ignore deno style imports
import { DiceValues } from "./dice-values.model.ts";

export interface DiceRoll {
  values: DiceValues;
  validTargets: number[];
}
