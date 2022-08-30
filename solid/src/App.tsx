import {Component, createSignal} from 'solid-js';
import styles from './App.module.css';

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

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <input value={sessionId()} onChange={({target}) => setSessionId((target as HTMLInputElement).value)}/>
        <button onClick={() => setupSocket(sessionId())}>Join session with id {sessionId()}</button>
        <br/><br/>
        <button onClick={() => setupSocket()}>Host Game</button>
      </header>
    </div>
  );
};

export default App;
