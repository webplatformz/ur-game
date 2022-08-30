import { Component, Show } from 'solid-js';

import styles from './pre-game-lobby.module.css';
import Loader from '../../components/loader/loader';
import Header from '../../components/header/header';

type Props = {
  isPrivateGame?: boolean
  onClose: () => void
}

const PreGameLobby: Component<Props> = ({ onClose, isPrivateGame = false }) => {
  return (
    <div class={styles.rootContainer}>
      <Header />
      <h3 class={styles.playerName}>Player34532</h3>
      <Show when={isPrivateGame}>
        Room id: #4222
      </Show>
      <div class={styles.waitingForPlayerContainer}>
        <p>Waiting for other Player</p>
        <Loader color={'var(--main-color)'} />
        <button onClick={onClose}>Leave Lobby</button>
      </div>
    </div>
  );
};

export default PreGameLobby;
