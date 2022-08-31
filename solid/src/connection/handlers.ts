import { ServerWebsocketMessages } from "@shared-models/message-types.model";
import { loadDiceRoll, updateGame } from "../game/game";
import { navigateToGameIfNecessary } from "../navigation";
import { loadSession } from "./session";

export function handle(message: ServerWebsocketMessages) {
  switch (message.type) {
    case "gamesession":
      loadSession(message.sessionId, message.playerColor);
      break;
    case "gamecontext":
      if (message.state === 'roll') {
        updateGame(message);
        navigateToGameIfNecessary();
      }
      if (message.state === 'move') {
        loadDiceRoll(message.currentDiceRoll);
      }
      break;
  }
}
