import styles from "./loader.module.css";
import { Component, For } from "solid-js";

type Props = {
  color: string;
};

const Loader: Component<Props> = ({ color }) => {
  return (
    <div class={styles.loader}>
      <For each={Array(4)}>
        {() => <div style={{ background: color }}></div>}
      </For>
    </div>
  );
};

export default Loader;
