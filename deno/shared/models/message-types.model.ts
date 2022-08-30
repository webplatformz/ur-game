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

type WebsocketMessage<T extends MessageType, P> = { type: T } & P;
type EmptyPayload = {};

export type WebsocketMessages =
  | WebsocketMessage<"roll", EmptyPayload>
  | WebsocketMessage<"gamestate", GameState>
  | WebsocketMessage<"move", Move>
  | WebsocketMessage<"players", Players>
  | WebsocketMessage<"diceroll", DiceRoll>
  | WebsocketMessage<"ready", EmptyPayload>
  | WebsocketMessage<"score", Score>;
