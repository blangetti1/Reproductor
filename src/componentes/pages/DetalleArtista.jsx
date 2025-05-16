import React, { useEffect, useState } from 'react';
import { getArtist, getArtistAlbums } from '../utilidades/obtenerTokenSpotify';

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
    <div>
      <h2>{artista.name}</h2>
      {artista.images && artista.images[0] && (
        <img src={artista.images[0].url} alt={artista.name} width={200} />
      )}
      <p>Seguidores: {artista.followers.total.toLocaleString()}</p>
      <p>Géneros: {artista.genres.join(', ')}</p>

      <h3>Álbumes</h3>
      {albumes.length === 0 && <p>No se encontraron álbumes.</p>}
      <ul>
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
