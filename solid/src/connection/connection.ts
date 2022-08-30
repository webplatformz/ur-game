import { createSignal } from "solid-js";
import {
  WebsocketClientMessages,
  WebsocketServerMessages,
} from "../../../deno/shared/models/message-types.model";
import { handle } from "./handlers";

const [socket, setSocket] = createSignal<WebSocket>();

export const connectSocket = ({ sessionId = "" } = {}) => {
  const { host, protocol } = location;

  const webSocketURL = new URL(
    `${protocol === "https:" ? "wss" : "ws"}://${host}/ws`,
  );

  if (sessionId) webSocketURL.searchParams.append("sessionId", sessionId);

  const socket = new WebSocket(webSocketURL);

  startSocketListeners(socket);

  setSocket(socket);
};

const startSocketListeners = (socket: WebSocket) => {
  socket.onmessage = (event) => {
    console.log("Message from server:");
    console.log(event);
    console.log(JSON.parse(event.data));

    const message: WebsocketServerMessages = JSON.parse(event.data);
    handle(message);
  };

  socket.onopen = (event) => {
    console.log("Connection opened:");
    console.log(event);
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
  msg: WebsocketClientMessages,
) => {
  const socketIns = socket();

  socketIns?.send(JSON.stringify(msg));
};
