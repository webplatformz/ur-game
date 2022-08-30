import { Component } from 'solid-js';

type Props = {
  class: string
}
const Dice: Component<Props> = (props) => {
  return (
    <div classList={{ [props.class]: true }}>
      TODO: Dice
    </div>
  );
};

export default Dice;
