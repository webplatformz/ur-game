import { WebsocketServerMessages } from "../../../deno/shared/models/message-types.model";
import { loadDiceRoll } from "../game/game";

export function handle(message: WebsocketServerMessages) {
  switch (message.type) {
    case "diceroll":
      loadDiceRoll(message.values);
      break;
  }
}
