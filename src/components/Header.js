import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      retorna: '',
      loanding: false,
    };
  }

  componentDidMount() {
    this.retornaDados();
  }

    retornaDados = () => {
      this.setState({ loanding: true }, async () => {
        const nome = await getUser();
        console.log(nome);
        this.setState({
          loanding: false,
          retorna: nome.name,

        });
      });
    }

    render() {
      const { retorna, loanding } = this.state;
      return (
        <header data-testid="header-component">
          { loanding === true ? <p>Carregando...</p> : (
            <p data-testid="header-user-name">{ retorna }</p>)}
        </header>

      );
    }
}

export default Header;
