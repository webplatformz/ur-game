import { ClientWebsocketMessages } from "@shared-models/message-types.model";
import { handle } from "./handlers";

let socket: WebSocket;

export async function connectSocket(
  quickMatch: boolean,
  botMatch: boolean,
  sessionId?: string,
): Promise<void> {
  const { host, protocol } = location;

  const webSocketURL = new URL(
    `${protocol === "https:" ? "wss" : "ws"}://${host}/ws`,
  );

  if (quickMatch) {
    webSocketURL.searchParams.append("quickmatch", "true");
  } else if (botMatch) {
    webSocketURL.searchParams.append("botmatch", "true");
  } else if (sessionId) {
    webSocketURL.searchParams.append("sessionId", sessionId);
  }

  socket = new WebSocket(webSocketURL);
  return new Promise((resolve) => {
    socket.onopen = () => {
      startSocketListeners(socket);
      resolve();
    };
  });
}

const startSocketListeners = (socket: WebSocket) => {
  socket.onmessage = (event) => {
    console.log("Message from server:");
    console.log(event);
    console.log(JSON.parse(event.data));

    handle(JSON.parse(event.data));
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

export const sendMessage = (msg: ClientWebsocketMessages) => {
  socket?.send(JSON.stringify(msg));
};
