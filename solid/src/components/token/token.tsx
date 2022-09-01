import { Accessor, Component, Show } from "solid-js";
import { TokenOwner } from "../../game/useField";
import style from "./token.module.css";

type TokenProps = {
  count: Accessor<number>;
  owner: Accessor<TokenOwner | null>;
  tokenType: "standard" | "ghost";
};

const Token: Component<TokenProps> = (
  { count, owner, tokenType },
) => {
  return (
    <div
      classList={{
        [style.circle]: true,
        [style.player]: owner() === "player",
        [style.opponent]: owner() === "opponent",
        [style.ghost]: tokenType === "ghost",
      }}
    >
      <Show when={count() > 1}>{count()}</Show>
    </div>
  );
};

export default Token;
