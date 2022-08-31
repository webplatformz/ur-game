import { ServerWebsocketMessages } from "@shared-models/message-types.model";
import { updateGame } from "../game/game";
import { navigateToGameIfNecessary } from "../navigation";
import { loadSession } from "./session";

export function handle(message: ServerWebsocketMessages) {
  switch (message.type) {
    case "gamesession":
      loadSession(message.sessionId, message.playerColor);
      break;
    case "gamecontext":
      updateGame(message);
      navigateToGameIfNecessary();
      break;
  }
}
