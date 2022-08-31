import {Accessor, Component, Show} from 'solid-js';
import {TokenOwner} from '../../game/useField';
import style from './token.module.css';
import {playerColor} from '../../connection/session';
import {PlayerColor} from '@shared-models/game-context.model';

type TokenProps = {
  count: Accessor<number>;
  owner: Accessor<TokenOwner | null>;
  tokenType: 'standard' | 'ghost';
};

const Token: Component<TokenProps> = (
  {count, owner, tokenType},
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
        [style.ghost]: tokenType === 'ghost',
      }}
    >
      <Show when={count() > 1}>{count()}</Show>
    </div>
  );
};

export default Token;
