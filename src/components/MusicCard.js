import React from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      reloanding: false,
      data2: [],
      musicaFav: [],
    };
  }

  componentDidMount() {
    this.getmusicas();
  }

  getmusicas = () => {
    this.setState({
      loading: true,
    });
    getFavoriteSongs().then((musicas) => {
      this.setState({
        musicaFav: musicas,
        loading: false,
      }, () => {
        this.musicaFavCheck();
      });
    });
  }

  musicaFavCheck = () => {
    const { trackId } = this.props;
    const { musicaFav } = this.state;
    console.log(musicaFav);
    musicaFav.forEach((index) => {
      console.log(index);
      if (index.trackId === trackId) {
        this.setState({
          reloanding: true,
        });
      }
    });
  }

  addFavoritas = () => {
    console.log(this.props);
    this.setState({ loading: true }, async () => {
      const { artista } = this.props;
      const { reloanding } = this.state;
      await addSong(artista);
      this.setState({
        loading: false,
        reloanding: !reloanding,
      });
    });
  }

  render() {
    const {
      trackName,
      previewUrl,
      artista,
    } = this.props;
    const {
      loading,
      reloanding,
      data2,
    } = this.state;
    const { trackId } = artista;
    return (
      <section>
        <p>
          { trackName }
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {console.log(data2)}
          <code>audio</code>
        </audio>
        <form>
          { loading && <p>Carregando...</p> }
          <label
            htmlFor="Favorita"
          >
            Favorita
            <input
              type="checkbox"
              name=""
              checked={ reloanding }
              onChange={ this.addFavoritas }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </form>
      </section>
    );
  }
}
MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
}.isRequired;
export default MusicCard;
