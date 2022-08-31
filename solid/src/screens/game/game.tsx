import { Component } from "solid-js";
import Header from "./header/header";
import Board from "./board/board";
import style from "./game.module.css";
import Dice from "./dice/dice";

type Props = {
    exitGame: () => void
}

const Game: Component<Props> = ({exitGame}) => {
  return (
    <>
      <Header exit={exitGame}/>
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
