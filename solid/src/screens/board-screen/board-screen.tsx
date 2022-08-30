import { Component } from 'solid-js';
import Board from './board';
import StartingGamePieces from './starting-game-pieces';
import Dice from './dice';

import styles from './board-screen.module.css'

const BoardScreen: Component = () => {
  return (
    <div class={styles.BoardScreen}>
      <Board class={styles.Board} />
      <StartingGamePieces class={styles.StartingPiecesPlayer1} />
      <StartingGamePieces class={styles.StartingPiecesPlayer2} />
      <Dice class={styles.Dice} />
    </div>
  );
};

export default BoardScreen;
