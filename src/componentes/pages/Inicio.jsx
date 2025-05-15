import { useState, useEffect } from 'react';
import { obtenerTokenSpotify } from '../utilidades/obtenerTokenSpotify';
import axios from 'axios';
import TarjetaArtista from '../tarjetaartista';

export default function Inicio() {
  const [busqueda, setBusqueda] = useState('');
  const [artistas, setArtistas] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    obtenerTokenSpotify().then(setToken);
  }, []);

  const buscar = async () => {
    if (!busqueda) return;
    if (!token) return;

    try {
      const res = await axios.get('https://api.spotify.com/v1/search', {
        headers: { Authorization: `Bearer ${token}` },
        params: { q: busqueda, type: 'artist', limit: 10 },
      });
      setArtistas(res.data.artists.items);
    } catch (error) {
      console.error('Error al buscar artistas:', error);
    }
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
