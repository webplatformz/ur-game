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
          "black4 battle5 white4"
          "black3 battle6 white3"
          "black2 battle7 white2"
          "black1 battle8 white1"
          "black0 battle9 white0"
          "black15 battle10 white15"
          "black14 battle11 white14"
          "black13 battle12 white13"
        `,
      }}
    >
      <For each={battleFields}>
        {(field) => <Field idx={field} owner="battle" />}
      </For>

      <For each={safeFields}>
        {(field) => (
          <>
            <Field idx={field} owner="black" />
            <Field idx={field} owner="white" />
          </>
        )}
      </For>
    </div>
  );
};

export default Board;
