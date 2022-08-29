import { Field } from "./Field.model";
import { WsMessage } from "./ws-message.model";

export interface BoardConfiguration extends WsMessage {
    type: 'boardconfig',
    fields: Field[],
} 
