import { ClientWebsocketMessages, ServerWebsocketMessages } from "@shared-models/message-types.model";
import { createSignal } from "solid-js";
import { handle } from "./handlers";

const [socket, setSocket] = createSignal<WebSocket>();

export async function connectSocket (sessionId: string | undefined, quickMatch: boolean): Promise<void> {
  const { host, protocol } = location;

  const webSocketURL = new URL(
    `${protocol === "https:" ? "wss" : "ws"}://${host}/ws`,
  );

  if(sessionId) {
      webSocketURL.searchParams.append("sessionId", sessionId);
  }
  if(quickMatch) {
      webSocketURL.searchParams.append("quickmatch", String(true));
  }

  const socket = new WebSocket(webSocketURL);

  return new Promise(resolve => {
      socket.onopen = () => {
          startSocketListeners(socket);
          setSocket(socket);
          resolve();
      }
  })
}

const startSocketListeners = (socket: WebSocket) => {
  socket.onmessage = (event) => {
    console.log("Message from server:");
    console.log(event);
    console.log(JSON.parse(event.data));

    const message: ServerWebsocketMessages = JSON.parse(event.data);
    handle(message);
  };

  socket.onclose = (event) => {
    console.log("Connection closed:");
    console.log(event);
  };

  socket.onerror = (event) => {
    console.log("Connection error:");
    console.log(event);
  };
};

export const sendMessage = (
  msg: ClientWebsocketMessages,
) => {
  const socketIns = socket();

  socketIns?.send(JSON.stringify(msg));
};
