// @ts-ignore deno style imports
import { Field } from "./field.model.ts";

export type PlayerColor = 'white' | 'black';

export interface GameState {
  boardWhite: number[];
  boardBlack: number[];
  currentPlayer: PlayerColor;
  isFinished: boolean;
  boardConfig: Field[];
}
