import { Component, createEffect, createSignal, Show } from "solid-js";
import Die, { TrianglePosition } from "./die";
import styles from "./dice.module.css";

// TODO: Use shared type
type DiceResult = (0 | 1)[];

type State =
  | {
      type: "WAITING_ON_PLAYER_ROLL";
    }
  | {
      type: "PLAYER_ROLLED";
      result: DiceResult;
    }
  | {
      type: "WAITING_ON_OPPONENT_ROLL";
    }
  | {
      type: "OPPONENT_ROLLED";
      result: DiceResult;
    };

const startPosition: TrianglePosition[] = [
  {
    x: 11,
    y: 30,
    rotation: -21,
  },
  {
    x: 21,
    y: 30,
    rotation: -7,
  },
  {
    x: 31,
    y: 30,
    rotation: 7,
  },
  {
    x: 41,
    y: 30,
    rotation: 21,
  },
];

const endPosition: TrianglePosition[] = [
  {
    x: 26,
    y: 100,
    rotation: 0,
  },
  {
    x: 26,
    y: 150,
    rotation: 0,
  },
  {
    x: 26,
    y: 200,
    rotation: 0,
  },
  {
    x: 26,
    y: 250,
    rotation: 0,
  },
];

type Props = {
  class: string;
};
const Dice: Component<Props> = (props) => {
  const [getState, setState] = createSignal<State>({
    type: "WAITING_ON_PLAYER_ROLL",
  });
  const [getDiceValues, setDiceValues] = createSignal<(0 | 1)[]>([0, 0, 0, 0]);

  function handleClickRoll() {
    // TODO
    // roll();
    handleMockNextState();
  }

  createEffect(() => {
    const state = getState();
    if (state.type === "OPPONENT_ROLLED" || state.type === "PLAYER_ROLLED")
      setDiceValues(state.result);
  });

  // TODO Delete
  function handleMockNextState() {
    switch (getState().type) {
      case "WAITING_ON_PLAYER_ROLL":
        setState({ type: "PLAYER_ROLLED", result: [0, 1, 1, 0] });
        break;
      case "PLAYER_ROLLED":
        setState({ type: "WAITING_ON_OPPONENT_ROLL" });
        break;
      case "WAITING_ON_OPPONENT_ROLL":
        setState({ type: "OPPONENT_ROLLED", result: [1, 1, 0, 0] });
        break;
      case "OPPONENT_ROLLED":
        setState({ type: "WAITING_ON_PLAYER_ROLL" });
        break;
    }
  }

  const isRolledState = () =>
    getState().type === "OPPONENT_ROLLED" ||
    getState().type === "PLAYER_ROLLED";

  function isDiceDark(diceIndex: number) {
    return getDiceValues()[diceIndex] === 1;
  }

  return (
    <div classList={{ [props.class]: true }}>
      {/*TODO Delete*/}
      <button onClick={handleMockNextState}>MOCK NEXT ROUND</button>
      <div classList={{ [styles.root]: true }}>
        <svg
          class={styles.svgContainer}
          height="100%"
          width="100%"
          viewBox="0 0 100 400"
        >
          <Die
            startPosition={startPosition[0]}
            endPosition={endPosition[0]}
            inRollState={isRolledState()}
            black={isDiceDark(0)}
          />
          <Die
            startPosition={startPosition[1]}
            endPosition={endPosition[1]}
            inRollState={isRolledState()}
            black={isDiceDark(1)}
          />
          <Die
            startPosition={startPosition[2]}
            endPosition={endPosition[2]}
            inRollState={isRolledState()}
            black={isDiceDark(2)}
          />
          <Die
            startPosition={startPosition[3]}
            endPosition={endPosition[3]}
            inRollState={isRolledState()}
            black={isDiceDark(3)}
          />
        </svg>
        <Show when={getState().type === "WAITING_ON_PLAYER_ROLL"}>
          <button class={styles.button} onClick={handleClickRoll}>
            ROLL!
          </button>
        </Show>
      </div>
    </div>
  );
};

export default Dice;
