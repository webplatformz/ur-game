import {Component} from 'solid-js';
import logo from '../../../logo.svg';
import exitIcon from '../../../assets/exit.svg';
import styles from './header.module.css'

type Props = {
    exit: () => void
}

const Header: Component<Props> = ({ exit }) => {


    return (
        <header class={styles.header}>
            <img alt="logo" class={styles.logo} src={logo}/>
            <button class={styles.exit} onClick={exit}><img alt="exitGame" src={exitIcon}/></button>
        </header>
    );
};

export default Header;
