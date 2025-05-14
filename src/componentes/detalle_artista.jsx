import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { obtenerTokenSpotify } from '../utils/obtenerTokenSpotify';
import TarjetaAlbum from '../components/TarjetaAlbum';

export default function DetalleArtista() {
  const { id } = useParams();
  const [token, setToken] = useState('');
  const [artista, setArtista] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    obtenerTokenSpotify().then(async (tk) => {
      setToken(tk);
      const resArtista = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { Authorization: `Bearer ${tk}` },
      });
      setArtista(resArtista.data);

      const resAlbums = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
        headers: { Authorization: `Bearer ${tk}` },
        params: { include_groups: 'album', market: 'US', limit: 10 },
      });
      setAlbums(resAlbums.data.items);
    });
  }, [id]);

  return (
    <div>
      {artista && (
        <>
          <h1>{artista.name}</h1>
          <img src={artista.images[0]?.url} alt={artista.name} width="300" />
        </>
      )}
      <h2>Álbumes</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {albums.map((album) => (
          <TarjetaAlbum key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}