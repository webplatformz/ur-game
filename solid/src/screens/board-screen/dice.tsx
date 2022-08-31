import { Component, createSignal, Show } from "solid-js";
import Die, { TrianglePosition } from "./die";
import styles from "./dice.module.css";

type DiceResult = {
  Dice1: boolean;
  Dice2: boolean;
  Dice3: boolean;
  Dice4: boolean;
};

type State =
  | {
      type: "READY_TO_ROLL";
    }
  | {
      type: "LOADING";
    }
  | {
      type: "ROLLING";
    }
  | {
      type: "ROLLED";
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
  const [getState, setState] = createSignal<State>({ type: "READY_TO_ROLL" });

  function handleClick() {
    setState({ type: "ROLLING" });
  }

  return (
    <div classList={{ [props.class]: true }}>
      <button
        onClick={() => {
          setState({ type: "READY_TO_ROLL" });
        }}
      >
        RTR
      </button>
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
            readyToRoll={getState().type === "READY_TO_ROLL"}
            black={false}
          />
          <Die
            startPosition={startPosition[1]}
            endPosition={endPosition[1]}
            readyToRoll={getState().type === "READY_TO_ROLL"}
            black={true}
          />
          <Die
            startPosition={startPosition[2]}
            endPosition={endPosition[2]}
            readyToRoll={getState().type === "READY_TO_ROLL"}
            black={false}
          />
          <Die
            startPosition={startPosition[3]}
            endPosition={endPosition[3]}
            readyToRoll={getState().type === "READY_TO_ROLL"}
            black={false}
          />
        </svg>
        <Show when={getState().type === "READY_TO_ROLL"}>
          <button class={styles.button} onClick={handleClick}>
            ROLL!
          </button>
        </Show>
      </div>
    </div>
  );
};

export default Dice;
