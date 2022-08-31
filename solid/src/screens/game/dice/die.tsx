import { Component, createEffect } from "solid-js";

import styles from "./die.module.css";

export type TrianglePosition = {
  x: number;
  y: number;
  rotation: number;
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

type Animations = {
  x: SVGAnimationElement | undefined;
  y: SVGAnimationElement | undefined;
  rotate: SVGAnimationElement | undefined;
  color: SVGAnimationElement | undefined;
};

function startAnimations(animations: Animations) {
  Object.values(animations).forEach((a) => a?.beginElement());
}

type Props = {
  black: boolean;
  startPosition: TrianglePosition;
  endPosition: TrianglePosition;
  inRollState: boolean;
};
const Die: Component<Props> = (props) => {
  const rollAnimations: Animations = {
    x: undefined,
    y: undefined,
    rotate: undefined,
    color: undefined,
  };

  const resetAnimations: Animations = {
    x: undefined,
    y: undefined,
    rotate: undefined,
    color: undefined,
  };

  createEffect(() => {
    if (props.inRollState) {
      startAnimations(rollAnimations);
    } else {
      startAnimations(resetAnimations);
    }
  });

  const colorToggleDuration = getRandomInt(1, 9) / 100 + 0.2;
  const nrOfColorToggles = Math.floor(2 / colorToggleDuration);

  return (
    <svg
      x={props.startPosition.x}
      y={props.startPosition.y}
      class={styles.triangelContainer}
      height="50"
      width="50"
      viewBox="-50 -50 200 200"
    >
      <animate
        ref={rollAnimations.x}
        attributeName="x"
        values={`${props.startPosition.x};${props.endPosition.x}`}
        dur="2s"
        begin="indefinite"
        fill="freeze"
      />
      <animate
        ref={resetAnimations.x}
        attributeName="x"
        values={`${props.endPosition.x};${props.startPosition.x}`}
        dur="1s"
        begin="indefinite"
        fill="freeze"
      />
      <animate
        ref={rollAnimations.y}
        attributeName="y"
        values={`${props.startPosition.y};${props.endPosition.y}`}
        dur="2s"
        begin="indefinite"
        fill="freeze"
      />
      <animate
        ref={resetAnimations.y}
        attributeName="y"
        values={`${props.endPosition.y};${props.startPosition.y}`}
        dur="1s"
        begin="indefinite"
        fill="freeze"
      />
      <polygon points="" />
      <polygon
        fill="white"
        transform={`rotate(${props.startPosition.rotation} 46.65 46.65)`}
        points="0,78.868 100,78.868 50,-7.735"
        classList={{ [styles.triangle]: true, [styles.black]: props.black }}
      >
        <animate
          ref={rollAnimations.color}
          attributeName="fill"
          from="var(--main-color)"
          to="white"
          dur={`${colorToggleDuration}s`}
          begin="indefinite"
          calcMode="discrete"
          repeatCount={nrOfColorToggles}
        />
        <animateTransform
          ref={rollAnimations.rotate}
          attributeName="transform"
          type="rotate"
          from={`${props.startPosition.rotation} 46.65 46.65`}
          to={`${
            props.endPosition.rotation + 120 * getRandomInt(8, 16)
          } 46.65 46.65`}
          dur="2s"
          begin="indefinite"
          fill="freeze"
        />
        <animateTransform
          ref={resetAnimations.rotate}
          attributeName="transform"
          type="rotate"
          from={`${props.endPosition.rotation} 50 50`}
          to={`${props.startPosition.rotation} 50 50`}
          dur="1s"
          fill="freeze"
        />
      </polygon>
      Sorry, your browser does not support inline SVG.
    </svg>
  );
};

export default Die;
