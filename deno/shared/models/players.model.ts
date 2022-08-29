// @ts-ignore deno style imports
import { Player } from "./player.model.ts";
// @ts-ignore deno style imports
import { WsMessage } from "./ws-message.model.ts";

export interface Players extends WsMessage {
    type: 'players',
    players: [Player, Player]
};
