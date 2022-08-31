import {createSignal} from "solid-js";
import {PlayerColor} from "../../../deno/shared/models/game-state.model";

export const [sessionId, setSessionId] = createSignal<string>();
export const [playerColor, setPlayerColor] = createSignal<PlayerColor>();
