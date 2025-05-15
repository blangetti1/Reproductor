import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerTokenSpotify, getArtist, getArtistAlbums } from '../utilidades/obtenerTokenSpotify';
import TarjetaAlbum from '../tarjetaalbum.jsx';


export default function DetalleArtista() {
  const { id } = useParams();
  const [artista, setArtista] = useState(null);
  const [albumes, setAlbumes] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem('spotifyToken');
      if (!storedToken) {
        const newToken = await getSpotifyToken();
        setToken(newToken);
        localStorage.setItem('spotifyToken', newToken);
        fetchArtistData(newToken);
      } else {
        setToken(storedToken);
        fetchArtistData(storedToken);
      }
    };

    const fetchArtistData = async (currentToken) => {
      const artistData = await getArtist(id, currentToken);
      setArtista(artistData);
      const albumsData = await getArtistAlbums(id, currentToken);
      setAlbumes(albumsData.items);
    };

    fetchData();
  }, [id]);

  if (!artista) {
    return <div>Cargando información del artista...</div>;
  }

  return (
    <div className={styles.contenedor}>
      <img src={artista.images[0]?.url} alt={artista.name} className={styles.imagenArtista} />
      <h2 className={styles.nombreArtista}>{artista.name}</h2>
      {artista.genres && artista.genres.length > 0 && (
        <div className={styles.generos}>
          {artista.genres.map((genero, index) => (
            <span key={index}>{genero}</span>
          ))}
        </div>
      )}

      {albumes && albumes.length > 0 && (
        <div>
          <h3 className={styles.albumesTitulo}>Álbumes</h3>
          <div className={styles.listaAlbumes}>
            {albumes.map((album) => (
              <TarjetaAlbum key={album.id} album={album} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}