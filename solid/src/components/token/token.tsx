import { Accessor, Component } from "solid-js";
import { TokenOwner } from "../../game/useField";
import style from "./token.module.css";

type TokenProps = {
  count: Accessor<number>;
  owner: Accessor<TokenOwner>;
};

const Token: Component<TokenProps> = (
  { count, owner },
) => {
  const colorClass = owner() === "player" ? style.player : style.opponent;
  const classes = [style.circle, colorClass].join(" ");

  return <div class={classes}>{count()}</div>;
};

export default Token;
