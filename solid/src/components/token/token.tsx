import {Component} from "solid-js";
import style from "./token.module.css";


type TokenProps = {
    count: number;
};

const Token: Component<TokenProps> = (
    {count},
) => {
    return (
        <div class={style.circle}>{count}</div>
    );
};

export default Token;
