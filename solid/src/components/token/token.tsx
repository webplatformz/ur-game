import { Accessor, Component, Show } from "solid-js";
import { TokenOwner } from "../../game/useField";
import style from "./token.module.css";

type TokenProps = {
  count: Accessor<number>;
  owner: Accessor<TokenOwner | null>;
};

const Token: Component<TokenProps> = (
  { count, owner },
) => {
  const classes = () => {
    const colorClass = owner() === "player" ? style.player : style.opponent;

    return [style.circle, colorClass].join(" ");
  };

  return <div class={classes()}>
        <Show when={count() > 1}>{count()}</Show>
    </div>;
};

export default Token;
