import { Component } from 'solid-js';

import styles from './menu-screen.module.css';
import Header from '../../components/header/header';
import InputContainer from '../../components/inputContainer/inputContainer';

type Props = {
  onHost: () => void
  onJoin: (sessionId: string) => void
  onQuickStart: () => void
}
const MenuScreen: Component<Props> = ({onHost, onJoin, onQuickStart}) => {
  return (
    <div class={styles.rootContainer}>
      <Header />
      <button onClick={onQuickStart}>
        Quick Start
      </button>
      <InputContainer confirmInputValue={onJoin} buttonText="Join" placeholderText="#0000" />
      <button onClick={onHost} >
        Host private game
      </button>
    </div>
  );
};

export default MenuScreen;
