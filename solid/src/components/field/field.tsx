import { Component } from "solid-js";
import { FieldOwner, useField } from "../../game/useField";

type FieldProps = {
  idx: number;
  owner: FieldOwner;
};

const Field: Component<FieldProps> = (
  { idx, owner },
) => {
  const { tokenCount } = useField(idx, owner);

  return (
    <div
      style={{
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        border: "white 1px solid",
        width: "200px",
        height: "200px",
        "background-color": "orange",
        "grid-area": `${owner}${idx}`,
      }}
    >
      {tokenCount()}: {owner}-{idx}
    </div>
  );
};

export default Field;
