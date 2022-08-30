import {Component} from 'solid-js';
import Header from "./header/header";
import Board from "./board/board";
import style from "./game.module.css";

const Game: Component = () => {
    return (
        <>
            <Header/>
            <div class={style.board}><Board /></div>
        </>
    );
};

export default Game;
