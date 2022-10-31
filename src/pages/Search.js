import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      boleano: true,
      loanding: false,
      userGuardado: '',
      data: [],

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

  limpaDados = () => {
    const { user } = this.state;
    this.setState({ userGuardado: user, user: '', loanding: true }, async () => {
      const listaArray = await searchAlbumsAPI(user);
      this.setState({
        loanding: false,
        data: listaArray,
      });
    });
  }

  render() {
    const { user, boleano, loanding, data, userGuardado } = this.state;
    return (
      <div className="foto-album" data-testid="page-search">
        <Header />
        { loanding === true ? <p>Carregando...</p> : (
          <section>
            <form>
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
                onClick={ this.limpaDados }
              >
                Pesquisar
              </button>
            </form>
            {data.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
              <div>
                <p>
                  {` Resultado de álbuns de: 
                  ${userGuardado}`}
                </p>
                {data.map((artista) => (
                  <section key={ `${artista.artistName}${artista.collectionName}` }>
                    <img src={ artista.artworkUrl100 } alt={ artista.artistName } />
                    <p>{artista.artistName}</p>
                    <p>{artista.collectionName}</p>
                    <Link
                      to={ `/album/${artista.collectionId}` }
                      data-testid={ `link-to-album-${artista.collectionId}` }
                    >
                      Album de Música
                    </Link>
                  </section>
                ))}
              </div>
            )}
          </section>
        )}

      </div>);
  }
}
export default Search;
