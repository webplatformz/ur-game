// @ts-ignore deno style imports
import { Field } from "./field.model.ts";
// @ts-ignore deno style imports
import { WsMessage } from "./ws-message.model.ts";

export interface BoardConfiguration extends WsMessage {
  type: "boardconfig";
  fields: Field[];
}
