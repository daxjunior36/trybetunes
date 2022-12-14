import propTypes from 'prop-types';
import React from 'react';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      data2: [],
      collectionName: '',
      artistName: '',
      carregando: false,
    };
  }

  componentDidMount() {
    this.listaMusicas();
  }

  listaMusicas = () => {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({}, async () => {
      const arquivoMusica = await getMusics(id);
      this.setState({
        data2: arquivoMusica,
        artistName: arquivoMusica[0].artistName,
        collectionName: arquivoMusica[0].collectionName,
      });
    });
  }

  render() {
    const { data2, artistName, collectionName, carregando } = this.state;

    return (

      <div data-testid="page-album">
        <Header />
        {data2.length > 0 && (
          <div>
            { carregando && <p>Carregando...</p> }
            <p data-testid="artist-name">{ artistName }</p>
            <p data-testid="album-name">{ collectionName }</p>
            {data2.map((artista) => (
              <div key={ `${artista.trackName}${artista.trackNumber}` }>
                {artista.previewUrl !== undefined && (
                  <MusicCard
                    trackName={ artista.trackName }
                    previewUrl={ artista.previewUrl }
                    artista={ artista }
                    data2={ data2 }
                    trackId={ artista.trackId }
                  />)}
              </div>
            ))}
          </div>)}
      </div>

    );
  }
}

Album.propTypes = ({
  id: propTypes.string,
}).isRequired;

export default Album;

// se meu trackNumber !==  undefined quero que ele mostre=(renderizar) na tela.
