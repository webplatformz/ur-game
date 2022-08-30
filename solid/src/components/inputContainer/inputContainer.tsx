import type {Component} from 'solid-js';

import styles from './inputContainer.module.css';
import {createSignal} from "solid-js";

export interface InputContainerProps {
    confirmInputValue:(value: string) => void;
    buttonText: string;
    placeholderText: string;
}

const InputContainer: Component<InputContainerProps> = ({confirmInputValue, buttonText, placeholderText}) => {

    const [inputValue, setInputValue] = createSignal('');

    return (
            <div class={styles.inputContainer}>
                <input type="text" placeholder={placeholderText} maxLength={20}
                       onInput={(e) => {
                           setInputValue(e.currentTarget.value);
                       }}
                       onKeyPress={event => {
                           if (event.key === 'Enter') { confirmInputValue(inputValue()) }
                       }}
                />
                <button id="btnSubmit" disabled={!inputValue()} onClick={() => confirmInputValue(inputValue())}>{buttonText}</button>
            </div>

    );
};

export default InputContainer;
