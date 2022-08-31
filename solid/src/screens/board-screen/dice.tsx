import { Component } from "solid-js";
import { diceRoll, roll } from "../../game/game";

type Props = {
  class: string;
};
const Dice: Component<Props> = (props) => {
  return (
    <div classList={{ [props.class]: true }}>
      <button onClick={roll}>Roll</button>
      <div>result: {diceRoll()}</div>
    </div>
  );
};

export default Dice;
