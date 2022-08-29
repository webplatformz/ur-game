import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
  const {host, protocol} = location;
  const socket = new WebSocket(`${protocol === 'https:' ? 'wss' : 'ws'}://${host}/ws`);
  socket.addEventListener('message', event => console.log('Message from server:', event.data));

  const sendMsg = () => socket.send('Echo?');

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        
        <button onClick={sendMsg}>Send Message on WebSocket</button>
      </header>
    </div>
  );
};

export default App;
