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
// @ts-ignore deno style imports
import { ErrorPayload } from "./error.model.ts";

type WebsocketMessage<T extends string, P> = { type: T } & P;
type EmptyPayload = {};

export type ClientWebsocketMessages =
  | WebsocketMessage<"ready", EmptyPayload>
  | WebsocketMessage<"roll", EmptyPayload>
  | WebsocketMessage<"move", Move>;

export type ServerWebsocketMessages =
  | WebsocketMessage<"gamestate", GameState>
  | WebsocketMessage<"players", Players>
  | WebsocketMessage<"diceroll", DiceRoll>
  | WebsocketMessage<"error", ErrorPayload>
  | WebsocketMessage<"score", Score>;

export type WebsocketMessages =
  | ClientWebsocketMessages
  | ServerWebsocketMessages;
