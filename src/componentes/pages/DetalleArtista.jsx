import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerTokenSpotify, getArtist, getArtistAlbums } from '../utilidades/obtenerTokenSpotify';
import TarjetaAlbum from '../tarjetaalbum.jsx';
import styles from './DetalleArtista.module.css';

export default function DetalleArtista() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artista, setArtista] = useState(null);
  const [albumes, setAlbumes] = useState([]);
  const [token, setToken] = useState('');
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    // Cargar datos y token
    const fetchData = async () => {
      const storedToken = localStorage.getItem('spotifyToken');
      if (!storedToken) {
        const newToken = await obtenerTokenSpotify();
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

    // Verificar si artista es favorito
    const favoritos = JSON.parse(localStorage.getItem('artistasFavoritos')) || [];
    setEsFavorito(favoritos.includes(id));

  }, [id]);

  const toggleFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem('artistasFavoritos')) || [];
    let nuevosFavoritos;
    if (esFavorito) {
      // Quitar de favoritos
      nuevosFavoritos = favoritos.filter(favId => favId !== id);
    } else {
      // Agregar a favoritos
      nuevosFavoritos = [...favoritos, id];
    }
    localStorage.setItem('artistasFavoritos', JSON.stringify(nuevosFavoritos));
    setEsFavorito(!esFavorito);
  };

  if (!artista) {
    return <div>Cargando información del artista...</div>;
  }

  return (
    <div className={styles.contenedor}>
      <button className={styles.botonVolver} onClick={() => navigate('/buscar')}>
        Volver a búsqueda
      </button>

      <button onClick={toggleFavorito} style={{ marginBottom: '1rem' }}>
        {esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </button>

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
