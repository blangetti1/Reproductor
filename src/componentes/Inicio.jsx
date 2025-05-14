import { useState, useEffect } from 'react';
import axios from 'axios';
import { obtenerTokenSpotify } from '../utils/obtenerTokenSpotify';
import TarjetaArtista from '../components/TarjetaArtista';

export default function Inicio() {
  const [busqueda, setBusqueda] = useState('');
  const [artistas, setArtistas] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    obtenerTokenSpotify().then(setToken);
  }, []);

  const buscar = async () => {
    if (!busqueda) return;
    const res = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: busqueda, type: 'artist', limit: 10 },
    });
    setArtistas(res.data.artists.items);
  };

  return (
    <div>
      <h1>Buscar Artistas</h1>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Nombre del artista"
      />
      <button onClick={buscar}>Buscar</button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {artistas.map((artista) => (
          <TarjetaArtista key={artista.id} artista={artista} />
        ))}
      </div>
    </div>
  );
}