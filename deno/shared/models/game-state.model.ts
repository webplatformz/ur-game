// @ts-ignore deno style imports
import { Field } from "./field.model.ts";

export type PlayerColor = "light" | "dark";

export interface GameState {
  boardWhite: number[];
  boardBlack: number[];
  currentPlayer: PlayerColor;
  isFinished: boolean;
  boardConfig: Field[];
}
