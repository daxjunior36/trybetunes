import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      boleano: true,
      loanding: false,
      reloanding: false,

    };
  }

  mudaState = () => {
    const num3 = 3;
    const { user } = this.state;
    if (user.length >= num3) {
      this.setState({ boleano: false });
    } else {
      this.setState({ boleano: true });
    }
  }

  handlerChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    },
    () => this.mudaState());
  }

  dadosDigitados = () => {
    const { user } = this.state;
    this.setState({ loanding: true }, async () => {
      await createUser({ name: user });
      this.setState({
        loanding: false,
        reloanding: true,
      });
    });
  }

  render() {
    const { user, boleano, loanding, reloanding } = this.state;
    return (
      <section>
        { loanding === true ? <h2><p>Carregando...</p></h2> : (
          <div className="input" data-testid="page-login">
            Login
            <input
              className="input2"
              id=""
              type="text"
              name="user"
              value={ user }
              onChange={ this.handlerChange }
              data-testid="login-name-input"
            />
            <div className="button-sub">
              <button
                type="submit"
                disabled={ boleano }
                data-testid="login-submit-button"
                onClick={ this.dadosDigitados }
              >
                Entrar
              </button>
            </div>
            { reloanding === true && (
              <Route exact path="/">
                <Redirect to="/search" />
              </Route>
            )}
          </div>
        )}
      </section>
    );
  }
}

export default Login;
