import { batch, createSignal } from "solid-js";
import { PlayerColor } from "../../../deno/shared/models/game-state.model";

const [sessionId, setSessionId] = createSignal<string>();
const [playerColor, setPlayerColor] = createSignal<PlayerColor>();

export const loadSession = (sessionId: string, playerColor: PlayerColor) => {
  batch(() => {
    setSessionId(sessionId);
    setPlayerColor(playerColor);
  });
};

export { playerColor, sessionId };
