// @ts-ignore deno style imports
import { Field } from "./field.model.ts";
import { WsMessage } from "./ws-message.model.ts";

export interface GameState extends WsMessage {
  type: "gamestate";
  boardWhite: number[];
  boardBlack: number[];
  currentPlayer: "white" | "black";
  isFinished: boolean;
  boardConfig: Field[];
}
