import type { Component } from 'solid-js';

import styles from './App.module.css';
import { createSignal, Match, Switch } from 'solid-js';
import MenuScreen from './screens/menu-screen/menu-screen';
import PreGameLobby from './screens/pre-game-lobby/pre-game-lobby';
import Header from './components/header/header';

type State = 'LOGGED_OUT' | 'IN_MENU_SCREEN' | 'IN_QUICKMATCH_PRE_GAME_LOBBY' | 'IN_PRIVATE_PRE_GAME_LOBBY' | 'IN_GAME';

function setupSocket(sessionId?: string): void {
  const {host, protocol} = location;
  const webSocketURL = new URL(`${protocol === 'https:' ? 'wss' : 'ws'}://${host}/ws`);
  if (sessionId) {
    webSocketURL.searchParams.append('sessionId', sessionId);
  }
  const socket = new WebSocket(webSocketURL);
  socket.addEventListener('message', event => console.log('Message from server:', event.data));
  socket.onopen = () => socket.send('');
}

const App: Component = () => {
  const [sessionId, setSessionId] = createSignal('');
  const socket = new WebSocket('ws://localhost:42069/');
  socket.addEventListener('message', event => console.log('Message from server:', event.data));
  const sendMsg = () => socket.send('Echo?');

  const [state, setState] = createSignal<State>('LOGGED_OUT');

  function handleQuickStart() {
    setState('IN_QUICKMATCH_PRE_GAME_LOBBY')
  }
  function handleJoin() {
    // setupSocket(sessionId)
    setState('IN_GAME')
  }
  function handleHost() {
    // setupSocket()
    setState('IN_PRIVATE_PRE_GAME_LOBBY')
  }
  function handleCloseLobby() {
    setState('IN_MENU_SCREEN')
  }

  return (
    <div class={styles.App}>
      <Switch>
        <Match when={state() === 'LOGGED_OUT'}>
          <Header />
          <p>TODO: LoginScreen</p>
          <button onClick={() => {setState('IN_MENU_SCREEN')}} >Login</button>
        </Match>
        <Match when={state() === 'IN_MENU_SCREEN'}>
          <MenuScreen onHost={handleHost} onJoin={handleJoin} onQuickStart={handleQuickStart} />
        </Match>
        <Match when={state() === 'IN_QUICKMATCH_PRE_GAME_LOBBY'}>
          <PreGameLobby onClose={handleCloseLobby} />
        </Match>
        <Match when={state() === 'IN_PRIVATE_PRE_GAME_LOBBY'}>
          <PreGameLobby onClose={handleCloseLobby} isPrivateGame />
        </Match>
        <Match when={state() === 'IN_GAME'}>
          <p>TODO: BoardScreen</p>
        </Match>
      </Switch>
    </div>
  );
};

export default App;
