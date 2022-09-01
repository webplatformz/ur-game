import {
  ClientWebsocketMessages,
  ServerWebsocketMessages,
} from "../shared/models/message-types.model.ts";

export interface PlayerSession {
  connected: boolean;
  onClose: (closeEvent: CloseEvent) => void;
  onOpen: () => void;
  on(type: ClientWebsocketMessages["type"]): Promise<ClientWebsocketMessages>;
  send(message: ServerWebsocketMessages): void;
  close(): void;
}
