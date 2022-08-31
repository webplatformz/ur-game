import { Field } from "./field.model.ts";

export type PlayerColor = "light" | "dark";

export interface GameContext {
  boardLight: number[];
  boardDark: number[];
  currentPlayer: PlayerColor;
  isFinished: boolean;
  boardConfig: Field[];
}
