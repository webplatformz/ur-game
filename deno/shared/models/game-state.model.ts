import { WsMessage } from "./ws-message.model";

export interface GameState extends WsMessage {
    type: 'gamestate',
    boardWhite: number[],
    boardBlack: number[],
    currentPlayer: 'white' | 'black',
    isFinished: boolean,
}
