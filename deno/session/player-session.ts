import {
  ClientWebsocketMessages,
  ServerWebsocketMessages,
} from "../shared/models/message-types.model.ts";

type Listeners = {
  [k in ClientWebsocketMessages["type"]]?:
    ((message: ClientWebsocketMessages) => void);
};

export class PlayerSession {
  private connection: WebSocket;
  private listeners: Listeners = {};

  constructor(connection: WebSocket) {
    this.connection = connection;
    this.connection.onmessage = ({ data }) => {
      const parsedMessage: ClientWebsocketMessages = JSON.parse(data);
      this.listeners[parsedMessage.type]?.(parsedMessage);
    };
  }

  on(type: ClientWebsocketMessages["type"]): Promise<ClientWebsocketMessages> {
    return new Promise((resolve) => {
      this.listeners[type] = (message) => {
        delete this.listeners[type];
        resolve(message);
      };
    });
  }

  send(message: ServerWebsocketMessages) {
    this.connection.send(JSON.stringify(message));
  }

  close() {
    this.connection.close();
  }

  set onClose(fn: (closeEvent: CloseEvent) => void) {
    this.connection.onclose = fn;
  }

  set onOpen(fn: () => void) {
    this.connection.onopen = fn;
  }

  get connected() {
    return this.connection.readyState === WebSocket.OPEN;
  }
}
