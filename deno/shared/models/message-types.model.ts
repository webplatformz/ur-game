import { GameState } from "./game-state.model.ts";
import { Players } from "./players.model.ts";
import { DiceRoll } from "./dice-roll.model.ts";
import { Move } from "./move.model.ts";
import { Score } from "./score.model.ts";
import { ErrorPayload } from "./error.model.ts";
import { GameSession } from "./game-session.model.ts";

type WebsocketMessage<T extends string, P> = { type: T } & P;
type EmptyPayload = Record<never, never>;

export type ClientWebsocketMessages =
  | WebsocketMessage<"ready", EmptyPayload>
  | WebsocketMessage<"roll", EmptyPayload>
  | WebsocketMessage<"move", Move>;

export type ServerWebsocketMessages =
  | WebsocketMessage<"gamesession", GameSession>
  | WebsocketMessage<"gamestate", GameState>
  | WebsocketMessage<"players", Players>
  | WebsocketMessage<"diceroll", DiceRoll>
  | WebsocketMessage<"error", ErrorPayload>
  | WebsocketMessage<"score", Score>;

export type WebsocketMessages =
  | ClientWebsocketMessages
  | ServerWebsocketMessages;
