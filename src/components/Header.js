import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link data-testid="link-to-search" to="/search"> Search </Link>
          <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
          <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
        </header>

      );
    }
}

export default Header;
