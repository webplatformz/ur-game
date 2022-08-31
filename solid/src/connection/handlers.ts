import { ServerWebsocketMessages } from "../../../deno/shared/models/message-types.model";
import { loadDiceRoll, updateGame } from "../game/game";
import { navigateToGameIfNecessary } from "../navigation";
import { loadSession } from "./session";

export function handle(message: ServerWebsocketMessages) {
  switch (message.type) {
    case "gamesession":
      loadSession(message.sessionId, message.playerColor);
      break;
    case "gamestate":
      updateGame(message);
      navigateToGameIfNecessary();
      break;
    case "diceroll":
      loadDiceRoll(message.values);
      break;
  }
}
