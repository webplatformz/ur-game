import { Component, createSignal } from 'solid-js';

import styles from './menu-screen.module.css';
import Header from '../../components/header/header';

type Props = {
  onHost: () => void
  onJoin: () => void
  onQuickStart: () => void
}
const MenuScreen: Component<Props> = ({onHost, onJoin, onQuickStart}) => {
  const [joinInputValue, setJoinInputValue] = createSignal<string>('');

  return (
    <div class={styles.rootContainer}>
      <Header />
      <button onClick={onQuickStart}>
        Quick Start
      </button>
      <div class={styles.joinContainer}>
        <input onInput={(e) => setJoinInputValue(e.currentTarget.value)} value={joinInputValue()} />
        <button onClick={onJoin}>Join</button>
      </div>
      <button onClick={onHost} >
        Host private game
      </button>
    </div>
  );
};

export default MenuScreen;
