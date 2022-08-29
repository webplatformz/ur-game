import { Player } from "./player.model";
import { WsMessage } from "./ws-message.model";

export interface Players extends WsMessage {
    type: 'players',
    players: [Player, Player]
};
