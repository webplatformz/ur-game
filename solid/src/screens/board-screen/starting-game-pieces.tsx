import { Component } from 'solid-js';

type Props = {
  class: string
}
const StartingGamePieces: Component<Props> = (props) => {
  return (
    <div classList={{ [props.class]: true }}>
      TODO: Starting Game Pieces
    </div>
  );
};

export default StartingGamePieces;
