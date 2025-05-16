import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerTokenSpotify, getArtist } from '../utilidades/obtenerTokenSpotify';
import axios from 'axios';
import TarjetaArtista from '../tarjetaartista';

export default function Buscar() {
  const [busqueda, setBusqueda] = useState('');
  const [artistas, setArtistas] = useState([]);
  const [token, setToken] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokenYFavoritos = async () => {
      const newToken = await obtenerTokenSpotify();
      setToken(newToken);
      cargarFavoritos(newToken);
    };
    fetchTokenYFavoritos();
  }, []);

  
  const cargarFavoritos = async (currentToken) => {
    const favoritosIds = JSON.parse(localStorage.getItem('artistasFavoritos')) || [];
    const favoritosData = [];

    for (const id of favoritosIds) {
      try {
        const artista = await getArtist(id, currentToken);
        favoritosData.push(artista);
      } catch (error) {
        console.error('Error al cargar artista favorito:', error);
      }
    }
    setFavoritos(favoritosData);
  };

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
    <div style={{ display: 'flex' }}>
 
      <aside style={{ width: '250px', marginRight: '1rem', borderRight: '1px solid #ccc', paddingRight: '1rem' }}>
        <h3>Artistas Favoritos</h3>
        {favoritos.length === 0 && <p>No hay artistas favoritos</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {favoritos.map((artista) => (
            <li
              key={artista.id}
              style={{ cursor: 'pointer', marginBottom: '0.5rem', color: 'blue' }}
              onClick={() => navigate(`/artista/${artista.id}`)}
            >
              {artista.name}
            </li>
          ))}
        </ul>
      </aside>

      
      <main style={{ flexGrow: 1 }}>
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
      </main>
    </div>
  );
}

