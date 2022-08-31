import { Component, Match, Switch } from "solid-js";
import MenuScreen from "./screens/menu-screen/menu-screen";
import PreGameLobby from "./screens/pre-game-lobby/pre-game-lobby";
import Header from "./components/header/header";
import styles from "./App.module.css";
import Login from "./screens/login/login";
import BoardScreen from "./screens/game/game";
import { connectSocket } from "./connection/connection";
import { navigationState, setNavigationState } from "./navigation";
import { Mocks } from "./Mock";

const App: Component = () => {
  async function handleQuickStart() {
    await connectSocket(true, undefined);
    setNavigationState("IN_QUICKMATCH_PRE_GAME_LOBBY");
  }

  async function handleJoin(sessionId: string) {
    await connectSocket(false, sessionId);
    setNavigationState("IN_PRIVATE_PRE_GAME_LOBBY");
  }

  async function handleHost() {
    await connectSocket(false, undefined);
    setNavigationState("IN_PRIVATE_PRE_GAME_LOBBY");
  }

  function handleClose() {
    setNavigationState("IN_MENU_SCREEN");
  }

  function handleLogin(name: string) {
    // TODO handle name
    setNavigationState("IN_MENU_SCREEN");
  }

  return (
    <div class={styles.App}>
      <Mocks />
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
          <PreGameLobby onClose={handleClose} />
        </Match>
        <Match when={navigationState() === "IN_PRIVATE_PRE_GAME_LOBBY"}>
          <PreGameLobby onClose={handleClose} isPrivateGame />
        </Match>
        <Match when={navigationState() === "IN_GAME"}>
          <BoardScreen exitGame={handleClose}/>
        </Match>
      </Switch>
    </div>
  );
};

export default App;
