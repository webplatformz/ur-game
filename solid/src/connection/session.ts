import { PlayerColor } from "@shared-models/game-context.model";
import { batch, createSignal } from "solid-js";

const [sessionId, setSessionId] = createSignal<string>();
const [playerColor, setPlayerColor] = createSignal<PlayerColor>();

export const loadSession = (sessionId: string, playerColor: PlayerColor) => {
  batch(() => {
    setSessionId(sessionId);
    setPlayerColor(playerColor);
  });
};

export { playerColor, sessionId };
