// @ts-ignore deno style imports
import { GameState } from "./game-state.model.ts";
// @ts-ignore deno style imports
import { Players } from "./players.model.ts";
// @ts-ignore deno style imports
import { DiceRoll } from "./dice-roll.model.ts";
// @ts-ignore deno style imports
import { Move } from "./move.model.ts";
// @ts-ignore deno style imports
import { Score } from "./score.model.ts";

export type ClientMessageType = "ready" | "roll" | "move";
export type ServerMessageType =
  | "players"
  | "boardconfig"
  | "gamestate"
  | "diceroll"
  | "score";
export type MessageType = ClientMessageType | ServerMessageType;

export type WebsocketMessage<T extends MessageType, P> = {
  type: T;
} & P;
type EmptyPayload = {};

export type WebsocketClientMessages =
  | WebsocketMessage<"ready", EmptyPayload>
  | WebsocketMessage<"move", Move>
  | WebsocketMessage<"roll", EmptyPayload>;
export type WebsocketServerMessages =
  | WebsocketMessage<"gamestate", GameState>
  | WebsocketMessage<"players", Players>
  | WebsocketMessage<"diceroll", DiceRoll>
  | WebsocketMessage<"score", Score>;
export type WebsocketMessages =
  | WebsocketClientMessages
  | WebsocketServerMessages;
