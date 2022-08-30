import { Component } from "solid-js";
import StartingGamePieces from "./starting-game-pieces";
import Dice from "./dice";

import styles from "./board-screen.module.css";
import Board from "../../components/board/board";
import { Mocks } from "../../Mocks";

const BoardScreen: Component = () => {
  return (
    <div class={styles.BoardScreen}>
      <div class={styles.Board}>
        <Mocks />
        <Board />
      </div>
      <StartingGamePieces class={styles.StartingPiecesPlayer1} />
      <StartingGamePieces class={styles.StartingPiecesPlayer2} />
      <Dice class={styles.Dice} />
    </div>
  );
};

export default BoardScreen;
