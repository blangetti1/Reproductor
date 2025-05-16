import React, { useEffect, useState } from 'react';
import { obtenerTokenConCache } from '../utilidades/obtenerTokenSpotify';
import TarjetaArtista from '../TarjetaArtista';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function Inicio() {
  const [busqueda, setBusqueda] = useState('');
  const [artistas, setArtistas] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchArtistas = async () => {
      if (!busqueda.trim()) {
        setArtistas([]); // Limpia la lista si la búsqueda está vacía
        return;
      }
      try {
        const token = await obtenerTokenConCache();
        // Corregí la URL de la API de búsqueda de artistas de Spotify
        const response = await fetch(`https://api.spotify.com/v1/search?q=${busqueda}&type=artist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtistas(data.artists.items);
      } catch (error) {
        console.error('Error al obtener artistas:', error);
      }
    };

    // Realiza la búsqueda solo si hay un término de búsqueda
    if (busqueda) {
      // Agregué un pequeño delay para evitar llamadas excesivas a la API mientras el usuario escribe
      const timeoutId = setTimeout(fetchArtistas, 300);
      return () => clearTimeout(timeoutId); // Limpia el timeout si el componente se desmonta o la búsqueda cambia rápidamente
    } else {
      setArtistas([]); // Asegura que la lista esté vacía si no hay búsqueda
    }
  }, [busqueda, navigate]); // Incluí navigate en las dependencias por buena práctica

  const handleArtistaClick = (id) => {
    navigate(`/artista/${id}`); // Redirige a la página de detalles del artista
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar artista"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {artistas.length === 0 && busqueda.trim() && <p>No se encontraron artistas.</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
        {artistas.map((artista) => (
          <TarjetaArtista
            key={artista.id}
            artista={artista}
            onClick={() => handleArtistaClick(artista.id)} // Llama a la función de navegación al hacer clic
          />
        ))}
      </div>
    </div>
  );
}

export default Inicio;