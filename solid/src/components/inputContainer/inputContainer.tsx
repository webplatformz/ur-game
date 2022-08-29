import type {Component} from 'solid-js';

import styles from './inputContainer.module.css';
import {createSignal} from "solid-js";

const InputContaier: Component = () => {

    const [inputValue, setInputValue] = createSignal('');

    // TODO Output Event?
    const confirmInputValue = () => console.log(inputValue());

    return (
            <div class={styles.inputContainer}>
                <input type="text" placeholder="Enter your name" maxLength={20}
                       onInput={(e) => {
                           setInputValue(e.currentTarget.value);
                       }}
                />
                <button id="btnSubmit" disabled={!inputValue()} onClick={confirmInputValue}>Login</button>
            </div>

    );
};

export default InputContaier;
