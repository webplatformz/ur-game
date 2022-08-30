import { ServerWebsocketMessages } from "../../../deno/shared/models/message-types.model";
import { loadDiceRoll } from "../game/game";

export function handle(message: ServerWebsocketMessages) {
  switch (message.type) {
    case "diceroll":
      loadDiceRoll(message.values);
      break;
  }
}
