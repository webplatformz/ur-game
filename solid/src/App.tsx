import { Component, createSignal, Match, Switch } from "solid-js";
import MenuScreen from "./screens/menu-screen/menu-screen";
import PreGameLobby from "./screens/pre-game-lobby/pre-game-lobby";
import Header from "./components/header/header";
import styles from "./App.module.css";
import Login from "./screens/login/login";
import BoardScreen from "./screens/board-screen/board-screen";

type NavigationState =
  | "LOGGED_OUT"
  | "IN_MENU_SCREEN"
  | "IN_QUICKMATCH_PRE_GAME_LOBBY"
  | "IN_PRIVATE_PRE_GAME_LOBBY"
  | "IN_GAME";

function setupSocket(sessionId?: string): void {
  const { host, protocol } = location;
  const webSocketURL = new URL(
    `${protocol === "https:" ? "wss" : "ws"}://${host}/ws`
  );
  if (sessionId) {
    webSocketURL.searchParams.append("sessionId", sessionId);
  }
  const socket = new WebSocket(webSocketURL);
  socket.addEventListener("message", (event) =>
    console.log("Message from server:", event.data)
  );
  socket.onopen = () => socket.send("");
}

const App: Component = () => {
  const [sessionId, setSessionId] = createSignal("");

  const [state, setState] = createSignal<NavigationState>("IN_GAME");

  function handleQuickStart() {
    setState("IN_QUICKMATCH_PRE_GAME_LOBBY");
  }

  function handleJoin(sessionId: string) {
    // TODO: setupSocket(sessionId)
    setState("IN_GAME");
  }

  function handleHost() {
    // TODO: setupSocket()
    setState("IN_PRIVATE_PRE_GAME_LOBBY");
  }

  function handleCloseLobby() {
    setState("IN_MENU_SCREEN");
  }

  function handleLogin(name: string) {
    // TODO: send or persist player name
    setState("IN_MENU_SCREEN");
  }

  return (
    <div class={styles.App}>
      <Switch>
        <Match when={state() === "LOGGED_OUT"}>
          <Header />
          <Login onLogin={handleLogin} />
        </Match>
        <Match when={state() === "IN_MENU_SCREEN"}>
          <MenuScreen
            onHost={handleHost}
            onJoin={handleJoin}
            onQuickStart={handleQuickStart}
          />
        </Match>
        <Match when={state() === "IN_QUICKMATCH_PRE_GAME_LOBBY"}>
          <PreGameLobby onClose={handleCloseLobby} />
        </Match>
        <Match when={state() === "IN_PRIVATE_PRE_GAME_LOBBY"}>
          <PreGameLobby onClose={handleCloseLobby} isPrivateGame />
        </Match>
        <Match when={state() === "IN_GAME"}>
          <BoardScreen />
        </Match>
      </Switch>
    </div>
  );
};

export default App;
