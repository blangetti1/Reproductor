import React, { useEffect, useState } from 'react';
import { obtenerTokenConCache } from '../utilidades/obtenerTokenSpotify';
import TarjetaArtista from '../TarjetaArtista';

function Inicio() {
  const [busqueda, setBusqueda] = useState('');
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    const fetchArtistas = async () => {
      try {
        const token = await obtenerTokenConCache();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${busqueda}&type=artist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setArtistas(data.artists.items);
      } catch (error) {
        console.error('Error al obtener artistas:', error);
      }
    };

    if (busqueda) fetchArtistas();
  }, [busqueda]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar artista"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {artistas.length === 0 && busqueda && <p>No se encontraron artistas.</p>}
      <div>
        {artistas.map((artista) => (
          <TarjetaArtista key={artista.id} artista={artista} onClick={() => console.log(artista.id)} />
        ))}
      </div>
    </div>
  );
}

export default Inicio;
