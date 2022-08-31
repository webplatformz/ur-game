import { Component, Show } from "solid-js";

import styles from "./pre-game-lobby.module.css";
import Loader from "../../components/loader/loader";
import Header from "../../components/header/header";
import { playerColor, sessionId } from "../../connection/session";

type Props = {
  isPrivateGame?: boolean;
  onClose: () => void;
};

const PreGameLobby: Component<Props> = ({ onClose, isPrivateGame = false }) => {
  return (
    <div class={styles.rootContainer}>
      <Header />
      <h3 class={styles.playerName}>Player {playerColor()}</h3>
      <Show when={isPrivateGame}>
        <div>
          Room id:
          <p class={styles.sessionId}>{sessionId()}</p>
        </div>
      </Show>
      <div class={styles.waitingForPlayerContainer}>
        <p class={styles.waitingMessage}>Waiting for other Player</p>
        <Loader color={"var(--main-color)"} />
        <button onClick={onClose}>Leave Lobby</button>
      </div>
    </div>
  );
};

export default PreGameLobby;
