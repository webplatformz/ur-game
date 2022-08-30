import { Component } from 'solid-js';
import logo from '../../logo.svg';
import styles from './header.module.css'

const Header: Component = () => {
  return (
    <header class={styles.header}>
      <img alt="logo" class={styles.logo} src={logo}/>
    </header>
  );
};

export default Header;
