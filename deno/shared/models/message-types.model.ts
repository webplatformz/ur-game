// @ts-ignore deno style imports
import { GameState } from "./game-state.model.ts";
// @ts-ignore deno style imports
import { Players } from "./players.model.ts";
// @ts-ignore deno style imports
import { DiceRoll } from "./dice-roll.model.ts";

export type ClientMessageType = "ready" | "roll" | "move";
export type ServerMessageType =
  | "players"
  | "boardconfig"
  | "gamestate"
  | "diceroll";
export type MessageType = ClientMessageType | ServerMessageType;

type WebsocketMessage<T extends MessageType, P> = { type: T } & P;

export type WebsocketMessages =
  | WebsocketMessage<"roll", never>
  | WebsocketMessage<"gamestate", GameState>
  // TODO add move message payload
  | WebsocketMessage<"move", never>
  | WebsocketMessage<"players", Players>
  | WebsocketMessage<"diceroll", DiceRoll>
  | WebsocketMessage<"ready", never>;
