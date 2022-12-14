import { Component } from "solid-js";

import styles from "./menu-screen.module.css";
import Header from "../../components/header/header";
import InputContainer from "../../components/inputContainer/inputContainer";

type Props = {
  onHost: () => void;
  onJoin: (sessionId: string) => void;
  onQuickStart: () => void;
  onBotStart: () => void;
};
const MenuScreen: Component<Props> = ({ onHost, onJoin, onQuickStart, onBotStart }) => {
  return (
    <div class={styles.rootContainer}>
      <Header />
      <div class={styles.menuContainer}>
        <button class={styles.menuEntry} onClick={onQuickStart}>
          Quick Start
        </button>
        <button class={styles.menuEntry} onClick={onBotStart}>
          Play against a bot
        </button>
        <InputContainer
          confirmInputValue={onJoin}
          buttonText="Join"
          placeholderText="#0000"
        />
        <button class={styles.menuEntry} onClick={onHost}>
          Host private game
        </button>
      </div>
    </div>
  );
};

export default MenuScreen;
