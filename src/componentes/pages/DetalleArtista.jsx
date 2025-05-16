import React, { useEffect, useState } from 'react';
import { getArtist, getArtistAlbums } from '../utilidades/obtenerTokenSpotify';
import styles from './DetalleArtista.module.css'; // Importa los estilos

function DetalleArtista({ artistaId }) {
  const [artista, setArtista] = useState(null);
  const [albumes, setAlbumes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatosArtista = async () => {
      try {
        const datosArtista = await getArtist(artistaId);
        setArtista(datosArtista);

        const datosAlbumes = await getArtistAlbums(artistaId);
        setAlbumes(datosAlbumes);
      } catch (err) {
        setError(err.message);
      }
    };

    if (artistaId) {
      fetchDatosArtista();
    }
  }, [artistaId]);

  if (error) return <p>Error: {error}</p>;
  if (!artista) return <p>Cargando artista...</p>;

  return (
    <div className={styles.contenedor}> {/* Aplica el contenedor de estilos */}
      <h2 className={styles.nombreArtista}>{artista.name}</h2> {/* Aplica estilo al nombre */}
      {artista.images && artista.images[0] && (
        <img
          src={artista.images[0].url}
          alt={artista.name}
          width={200}
          className={styles.imagenArtista} // Aplica estilo a la imagen
        />
      )}
      <p>Seguidores: {artista.followers.total.toLocaleString()}</p>
      {artista.genres && artista.genres.length > 0 && (
        <div className={styles.generos}> {/* Contenedor de géneros */}
          Géneros: {artista.genres.map((genre, index) => (
            <span key={index}>{genre}</span> // Estilo para cada género
          ))}
        </div>
      )}

      <h3 className={styles.albumesTitulo}>Álbumes</h3> {/* Aplica estilo al título de álbumes */}
      {albumes.length === 0 && <p>No se encontraron álbumes.</p>}
      <ul className={styles.listaAlbumes}> {/* Aplica estilo a la lista de álbumes */}
        {albumes.map((album) => (
          <li key={album.id}>
            <p>{album.name}</p>
            {album.images && album.images[0] && (
              <img src={album.images[0].url} alt={album.name} width={100} />
            )}
            <p>Fecha de lanzamiento: {album.release_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetalleArtista;