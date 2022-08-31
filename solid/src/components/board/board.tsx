import { Component, For } from "solid-js";
import Field from "../field/field";

const Board: Component = () => {
  const safeFields = [0, 1, 2, 3, 4, 13, 14, 15];
  const battleFields = [5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div
      style={{
        display: "grid",
        "grid-template-areas": `
          "dark4 battle5 light4"
          "dark3 battle6 light3"
          "dark2 battle7 light2"
          "dark1 battle8 light1"
          "dark0 battle9 light0"
          "dark15 battle10 light15"
          "dark14 battle11 light14"
          "dark13 battle12 light13"
        `,
      }}
    >
      <For each={battleFields}>
        {(field) => <Field idx={field} owner="battle" />}
      </For>

      <For each={safeFields}>
        {(field) => (
          <>
            <Field idx={field} owner="dark" />
            <Field idx={field} owner="light" />
          </>
        )}
      </For>
    </div>
  );
};

export default Board;
