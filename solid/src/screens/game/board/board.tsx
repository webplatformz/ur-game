import {Component} from "solid-js";
import style from "./board.module.css";
import rosette from "./../../../assets/rosette.png"
import four from "./../../../assets/four.png"
import five from "./../../../assets/five.png"
import squares from "./../../../assets/squares.png"

const Board: Component = () => {
    return (
        <div class={style.board}>
            <div>
                <img alt="square" class={style.square} src={rosette}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={four}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={five}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={squares}/>
            </div>
            <div class={style.columnSeven}>
                <img alt="square" class={style.square} src={rosette}/>
            </div>
            <div class={style.columnEight}>
                <img alt="square" class={style.square} src={four}/>
            </div>


            <div>
                <img alt="square" class={style.square} src={five}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={squares}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={four}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={rosette}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={five}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={squares}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={four}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={five}/>
            </div>


            <div>
                <img alt="square" class={style.square} src={rosette}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={four}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={five}/>
            </div>
            <div>
                <img alt="square" class={style.square} src={squares}/>
            </div>
            <div class={style.columnSeven}>
                <img alt="square" class={style.square} src={rosette}/>
            </div>
            <div class={style.columnEight}>
                <img alt="square" class={style.square} src={four}/>
            </div>

        </div>
    );
};

export default Board;