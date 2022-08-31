import {Component} from "solid-js";
import {FieldOwner, useField} from "../../game/useField";
import style from "./field.module.css";
import rosette from "./../../assets/rosette.png"
import empty from "./../../assets/empty.png"
import Token from "../token/token";


type FieldProps = {
  idx: number;
  owner: FieldOwner;
};

const Field: Component<FieldProps> = (
  { idx, owner },
) => {
  const { tokenCount,config } = useField(idx, owner);
  const {canThrowAgain} = config();

  const chooseImage = () => {
    if (canThrowAgain) {
      return rosette;
    }
    return empty;
  };


  return (
    <div style={{"grid-area": `${owner}${idx}`}} class={style.field}>
      <Token count={tokenCount()}/>
      <img alt="square" class={style.fieldContent} src={chooseImage()}/>
    </div>
  );
};

export default Field;
