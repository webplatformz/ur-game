import type {Component} from 'solid-js';

import logo from '../../logo.svg';
import styles from './login.module.css';
import InputContainer from "../inputContainer/inputContainer";
import {createSignal} from "solid-js";

const Login: Component = () => {
    const {host, protocol} = location;
    const socket = new WebSocket(`${protocol === 'https:' ? 'wss' : 'ws'}://${host}/ws`);
    socket.addEventListener('message', event => console.log('Message from server:', event.data));

    // const sendPlayerName = (inputValue: string) => socket.send(inputValue);
    const sendPlayerName = (inputValue: string) => console.log(inputValue);

    return (
        <div>
            <img class={styles.logo} src={logo} alt="logo"/>
            <InputContainer confirmInputValue={sendPlayerName} buttonText={"Login"} placeholderText={"Enter your name"}/>
        </div>
    );
};

export default Login;
