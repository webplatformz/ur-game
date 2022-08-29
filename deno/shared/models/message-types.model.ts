export type ClientMessageType = 'ready' | 'roll' | 'move';
export type ServerMessageType = 'players' | 'boardconfig' | 'gamestate' | 'diceroll';
export type MessageType = ClientMessageType | ServerMessageType;