import {Component} from "solid-js";
import style from "./board.module.css";
import Field from "../../../components/field/field";

const Board: Component = () => {
    return (
        <div class={style.board}>
            <Field idx={0} owner={"opponent"}></Field>
            <Field idx={1} owner={"opponent"}></Field>
            <Field idx={2} owner={"opponent"}></Field>
            <Field idx={3} owner={"opponent"}></Field>
            <Field idx={4} owner={"opponent"}></Field>
            <Field idx={13} owner={"opponent"}></Field>
            <Field idx={14} owner={"opponent"}></Field>
            <Field idx={15} owner={"opponent"}></Field>

            <Field idx={5} owner={"battle"}></Field>
            <Field idx={6} owner={"battle"}></Field>
            <Field idx={7} owner={"battle"}></Field>
            <Field idx={8} owner={"battle"}></Field>
            <Field idx={9} owner={"battle"}></Field>
            <Field idx={10} owner={"battle"}></Field>
            <Field idx={11} owner={"battle"}></Field>
            <Field idx={12} owner={"battle"}></Field>

            <Field idx={0} owner={"player"}></Field>
            <Field idx={1} owner={"player"}></Field>
            <Field idx={2} owner={"player"}></Field>
            <Field idx={3} owner={"player"}></Field>
            <Field idx={4} owner={"player"}></Field>
            <Field idx={13} owner={"player"}></Field>
            <Field idx={14} owner={"player"}></Field>
            <Field idx={15} owner={"player"}></Field>
        </div>
    );
};

export default Board;