import { Component } from 'solid-js';

import styles from './game-over.module.css';
import Header from '../../components/header/header';
import { currentPlayer } from '../../game/game';

type Props = {
  onRematch: () => void;
  onBackHome: () => void;
};

const GameOver: Component<Props> = ({ onRematch, onBackHome }) => {
  return (
    <div class={styles.rootContainer}>
      <Header />
      <h1>Game OuvUr</h1>
      <div class={styles.winnerContainer}>
        <div class={styles.victoryMsg}>All hail the King of Ur!</div>
        <div class={styles.playerName}>PlayUr {currentPlayer()}!</div>
      </div>
      <div class={styles.buttonContainer}>
        <button onClick={onBackHome}>Back to Menu</button>
      </div>
    </div>
  );
};

export default GameOver;
