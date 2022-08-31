import { Component } from "solid-js";
import Header from "./header/header";
import Board from "./board/board";
import style from "./game.module.css";
import Dice from "./dice/dice";

const Game: Component = () => {
  return (
    <>
      <Header />
      <div class={style.content}>
        <div class={style.board}>
          <Board />
        </div>
        <Dice class={style.dice} />
      </div>
    </>
  );
};

export default Game;
