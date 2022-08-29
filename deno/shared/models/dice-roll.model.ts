import { DiceValue } from "./dice-value.model";
import { WsMessage } from "./ws-message.model";

export interface DiceRoll extends WsMessage {
    type: 'diceroll',
    values: [DiceValue, DiceValue, DiceValue, DiceValue],
    validTargets: number[]
}
