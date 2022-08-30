import type { Component } from 'solid-js';
import InputContainer from '../../components/inputContainer/inputContainer';

type Props = {
  onLogin: (name: string) => void
}

const Login: Component<Props> = ({onLogin}) => {
  const sendPlayerName = (name: string) => onLogin(name);

  return (
    <div>
      <InputContainer confirmInputValue={sendPlayerName} buttonText={'Login'}
                      placeholderText={'Enter your name'} />
    </div>
  );
};

export default Login;
