/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import Login from './components/login/login';
import "bootstrap/dist/css/bootstrap.min.css";

render(() => <Login />, document.getElementById('root') as HTMLElement);
