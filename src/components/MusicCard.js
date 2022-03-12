import React from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      reloanding: false,

    };
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
