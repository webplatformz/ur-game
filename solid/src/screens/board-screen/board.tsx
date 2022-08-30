import { Component } from 'solid-js';

type Props = {
  class: string
}
const Board: Component<Props> = (props) => {
  return (
    <div classList={{ [props.class]: true }}>
      TODO: Board
    </div>
  );
};

export default Board;
