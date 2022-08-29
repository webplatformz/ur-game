// @ts-ignore deno style imports
import { DiceValue } from "./dice-value.model.ts";
// @ts-ignore deno style imports
import { WsMessage } from "./ws-message.model.ts";

export interface DiceRoll extends WsMessage {
    type: 'diceroll',
    values: [DiceValue, DiceValue, DiceValue, DiceValue],
    validTargets: number[]
}
