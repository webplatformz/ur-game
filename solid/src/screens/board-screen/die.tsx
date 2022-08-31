import { Component, createEffect, Show } from "solid-js";

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

type Props = {
  black: boolean;
  startPosition: TrianglePosition;
  endPosition: TrianglePosition;
  readyToRoll: boolean;
};
const Die: Component<Props> = (props) => {
  console.log("props", props);

  createEffect(() => {
    if (!props.readyToRoll) {
      animateXRoll?.beginElement();
      animateYRoll?.beginElement();
      animateRotateRoll?.beginElement();
    } else {
      animateXReset?.beginElement();
      animateYReset?.beginElement();
      animateRotateReset?.beginElement();
    }
  });

  let animateXRoll: SVGAnimationElement | undefined;
  let animateYRoll: SVGAnimationElement | undefined;
  let animateRotateRoll: SVGAnimationElement | undefined;

  let animateXReset: SVGAnimationElement | undefined;
  let animateYReset: SVGAnimationElement | undefined;
  let animateRotateReset: SVGAnimationElement | undefined;

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
        ref={animateXRoll}
        attributeName="x"
        values={`${props.startPosition.x};${props.endPosition.x}`}
        dur="2s"
        begin="indefinite"
        fill="freeze"
      />
      <animate
        ref={animateXReset}
        attributeName="x"
        values={`${props.endPosition.x};${props.startPosition.x}`}
        dur="1s"
        begin="indefinite"
        fill="freeze"
      />
      <animate
        ref={animateYRoll}
        attributeName="y"
        values={`${props.startPosition.y};${props.endPosition.y}`}
        dur="2s"
        begin="indefinite"
        fill="freeze"
      />
      <animate
        ref={animateYReset}
        attributeName="y"
        values={`${props.endPosition.y};${props.startPosition.y}`}
        dur="1s"
        begin="indefinite"
        fill="freeze"
      />
      <polygon points="" />
      <polygon
        transform={`rotate(${props.startPosition.rotation} 46.65 46.65)`}
        points="0,93.3 100,93.3 50,6.7"
        classList={{ [styles.triangle]: true, [styles.black]: props.black }}
      >
        <animateTransform
          ref={animateRotateRoll}
          attributeName="transform"
          type="rotate"
          from={`${props.startPosition.rotation} 46.65 46.65`}
          to={`${
            props.endPosition.rotation + 120 * getRandomInt(8, 16)
          } 46.65 46.65`}
          dur="2s"
          fill="freeze"
        />
        <animateTransform
          ref={animateRotateReset}
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
