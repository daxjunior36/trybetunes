import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      boleano: true,
    };
  }

      habilitaBotao = () => {
        const num2 = 2;
        const { user } = this.state;
        if (user.length >= num2) {
          this.setState({ boleano: false });
        } else {
          this.setState({ boleano: true });
        }
      }

      handlerChange = ({ target: { name, value } }) => {
        this.setState({
          [name]: value,
        },
        () => this.habilitaBotao());
      }

      render() {
        const { user, boleano } = this.state;
        return (

          <div data-testid="page-search">
            <Header />
            <p>ESTOU NO search</p>
            <input
              type="text"
              name="user"
              value={ user }
              onChange={ this.handlerChange }
              data-testid="search-artist-input"
            />
            <button
              type="button"
              disabled={ boleano }
              data-testid="search-artist-button"
              onClick={ this.habilitaBotao }
            >
              Pesquisar
            </button>
          </div>
        );
      }
}
export default Search;
