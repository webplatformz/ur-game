import { ServerWebsocketMessages } from "../../../deno/shared/models/message-types.model";
import {loadDiceRoll, setSessionId} from "../game/game";
import {navigateToGameIfNecessary} from "../navigation";

export function handle(message: ServerWebsocketMessages) {
  switch (message.type) {
    case "gamesession":
      setSessionId(message.sessionId);
      break;
    case "gamestate":
      // TODO set game state here
      navigateToGameIfNecessary();
      break;
    case "diceroll":
      loadDiceRoll(message.values);
      break;
  }
}
