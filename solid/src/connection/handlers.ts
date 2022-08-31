import { ServerWebsocketMessages } from "../../../deno/shared/models/message-types.model";
import {loadDiceRoll} from "../game/game";
import {navigateToGameIfNecessary} from "../navigation";
import {setPlayerColor, setSessionId} from "./session";

export function handle(message: ServerWebsocketMessages) {
  switch (message.type) {
    case "gamesession":
      setSessionId(message.sessionId);
      setPlayerColor(message.playerColor);
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
