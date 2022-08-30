// @ts-ignore deno style imports
import { Field } from "./field.model.ts";

export interface GameState {
  boardWhite: number[];
  boardBlack: number[];
  currentPlayer: "white" | "black";
  isFinished: boolean;
  boardConfig: Field[];
}
