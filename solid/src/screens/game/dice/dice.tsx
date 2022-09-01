import { Component, createEffect, createSignal, Show } from "solid-js";
import Die, { TrianglePosition } from "./die";
import styles from "./dice.module.css";
import { diceRoll, gameState, isItPlayersTurn, roll } from "../../../game/game";

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
  const [getDiceValues, setDiceValues] = createSignal<(0 | 1)[]>([1, 1, 1, 1]);

  function handleClickRoll() {
    roll();
  }

  createEffect(() => {
    const state = getState();
    if (state.type === "OPPONENT_ROLLED" || state.type === "PLAYER_ROLLED") {
      setDiceValues(state.result);
    }
  });

  createEffect(() => {
    switch (gameState()) {
      case "move":
        if (isItPlayersTurn()) {
          setState({ type: "PLAYER_ROLLED", result: diceRoll() });
        } else {
          setState({ type: "OPPONENT_ROLLED", result: diceRoll() });
        }
        break;
      case "roll":
        if (isItPlayersTurn()) {
          setState({ type: "WAITING_ON_PLAYER_ROLL" });
        } else {
          setState({ type: "WAITING_ON_OPPONENT_ROLL" });
        }
        break;
    }
  });

  const isRolledState = () =>
    getState().type === "OPPONENT_ROLLED" ||
    getState().type === "PLAYER_ROLLED";

  function isDiceDark(diceIndex: number) {
    return getDiceValues()[diceIndex] === 0;
  }

  function getDiceResultAsNumber() {
    return getDiceValues().reduce<number>((curr, prev) => prev + curr, 0);
  }

  return (
    <div classList={{ [props.class]: true }}>
      <div classList={{ [styles.root]: true }}>
        <div
          classList={{
            [styles.movesNrContainer]: true,
            [styles.hidden]: !isRolledState(),
          }}
        >
          Move <span class={styles.movesNr}>{getDiceResultAsNumber()}</span>
          {" "}
          {getDiceResultAsNumber() === 1 ? "Tile" : "Tiles"}
        </div>
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
          <div class={styles.buttonGlow} />
        </Show>
      </div>
    </div>
  );
};

export default Dice;
