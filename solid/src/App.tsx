import { Component, Match, Switch } from "solid-js";
import MenuScreen from "./screens/menu-screen/menu-screen";
import PreGameLobby from "./screens/pre-game-lobby/pre-game-lobby";
import Header from "./components/header/header";
import styles from "./App.module.css";
import Login from "./screens/login/login";
import BoardScreen from "./screens/board-screen/board-screen";
import { connectSocket } from "./connection/connection";
import {navigationState, setNavigationState} from "./navigation";

const App: Component = () => {
  async function handleQuickStart() {
    await connectSocket(undefined, true);
    setNavigationState("IN_QUICKMATCH_PRE_GAME_LOBBY");
  }

  async function handleJoin(sessionId: string) {
    await connectSocket(sessionId, false);
    setNavigationState("IN_PRIVATE_PRE_GAME_LOBBY");
  }

  async function handleHost() {
    await connectSocket(undefined, false);
    setNavigationState("IN_PRIVATE_PRE_GAME_LOBBY");
  }

  function handleCloseLobby() {
    setNavigationState("IN_MENU_SCREEN");
  }

  function handleLogin(name: string) {
    // TODO handle name
    setNavigationState("IN_MENU_SCREEN");
  }

  return (
    <div class={styles.App}>
      <Switch>
        <Match when={navigationState() === "LOGGED_OUT"}>
          <Header />
          <Login onLogin={handleLogin} />
        </Match>
        <Match when={navigationState() === "IN_MENU_SCREEN"}>
          <MenuScreen
            onHost={handleHost}
            onJoin={handleJoin}
            onQuickStart={handleQuickStart}
          />
        </Match>
        <Match when={navigationState() === "IN_QUICKMATCH_PRE_GAME_LOBBY"}>
          <PreGameLobby onClose={handleCloseLobby} />
        </Match>
        <Match when={navigationState() === "IN_PRIVATE_PRE_GAME_LOBBY"}>
          <PreGameLobby onClose={handleCloseLobby} isPrivateGame />
        </Match>
        <Match when={navigationState() === "IN_GAME"}>
          <BoardScreen />
        </Match>
      </Switch>
    </div>
  );
};

export default App;
