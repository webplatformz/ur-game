import {Component} from 'solid-js';
import logo from '../../../logo.svg';
import exit from '../../../assets/exit.svg';
import styles from './header.module.css'

const Header: Component = () => {
    return (
        <header class={styles.header}>
            <img alt="logo" class={styles.logo} src={logo}/>
            <img alt="exitGame" class={styles.exit} src={exit}/>
        </header>
    );
};

export default Header;
