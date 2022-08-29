// @ts-ignore deno style imports
import { WsMessage } from "./ws-message.model.ts";

export interface GameState extends WsMessage {
  type: "gamestate";
  boardWhite: number[];
  boardBlack: number[];
  currentPlayer: "white" | "black";
  isFinished: boolean;
}
