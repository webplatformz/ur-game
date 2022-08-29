import type {Component} from 'solid-js';

import logo from '../../logo.svg';
import styles from './login.module.css';
import InputContaier from "../inputContainer/inputContainer";

const Login: Component = () => {
    const {host, protocol} = location;
    const socket = new WebSocket(`${protocol === 'https:' ? 'wss' : 'ws'}://${host}/ws`);
    socket.addEventListener('message', event => console.log('Message from server:', event.data));

    // const [playerName, setPlayerName] = createSignal('');
    // const sendPlayerName = () => socket.send(playerName());


    return (
        <div>
            <img class={styles.logo} src={logo} alt="logo"/>
            <InputContaier/>

            {/*<div class={styles.inputContainer}>
                <input type="text" placeholder="Enter your name" maxLength={20}
                       onInput={(e) => {
                           setPlayerName(e.currentTarget.value);
                       }}
                />
                <button id="btnSubmit" disabled={!playerName()} onClick={sendPlayerName}>Login</button>
            </div>*/}

        </div>
    );
};

export default Login;
