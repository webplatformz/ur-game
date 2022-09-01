import {Accessor, Component, Show} from 'solid-js';
import {TokenOwner} from '../../game/useField';
import style from './token.module.css';
import {playerColor} from '../../connection/session';
import {PlayerColor} from '@shared-models/game-context.model';
import {TokenAnimation} from "../field/field";

type TokenProps = {
  count: Accessor<number>;
  owner: Accessor<TokenOwner | null>;
  animationDirection: Accessor<TokenAnimation | null>;
};

const Token: Component<TokenProps> = (
  { count, owner, animationDirection },
) => {
  function getTokenColor(): PlayerColor {
    if (owner() === 'player') {
      return playerColor()!;
    }
    return playerColor() === 'dark' ? 'light' : 'dark';
  }

  return (
    <div
      classList={{
        [style.circle]: true,
        [style[getTokenColor()]]: true,
        [style.animationFromLeft]: animationDirection() === 'fromLeft',
        [style.animationFromRight]: animationDirection() === 'fromRight',
        [style.animationFromTop]: animationDirection() === 'fromTop',
        [style.animationFromBottom]: animationDirection() === 'fromBottom',
      }}
    >
      <Show when={count() > 1}>{count()}</Show>
    </div>
  );
};

export default Token;
