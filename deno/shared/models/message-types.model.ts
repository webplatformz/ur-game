import { ErrorPayload } from "./error.model.ts";
import { GameContext } from "./game-context.model.ts";
import { GameSession } from "./game-session.model.ts";
import { Move } from "./move.model.ts";
import { Players } from "./players.model.ts";

type WebsocketMessage<T extends string, P> = { type: T } & P;
type EmptyPayload = Record<never, never>;

export type ClientWebsocketMessages =
  | WebsocketMessage<"ready", EmptyPayload>
  | WebsocketMessage<"roll", EmptyPayload>
  | WebsocketMessage<"move", Move>
  | WebsocketMessage<"leave", EmptyPayload>;

export type ServerWebsocketMessages =
  | WebsocketMessage<"gamesession", GameSession>
  | WebsocketMessage<"gamecontext", GameContext>
  | WebsocketMessage<"players", Players>
  | WebsocketMessage<"error", ErrorPayload>
  | WebsocketMessage<"menu", EmptyPayload>;

export type WebsocketMessages =
  | ClientWebsocketMessages
  | ServerWebsocketMessages;
