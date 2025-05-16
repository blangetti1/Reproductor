import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './componentes/pages/Inicio';
import DetalleArtista from './componentes/pages/DetalleArtista';
import Login from './componentes/pages/Login';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [credencialesGuardadas, setCredencialesGuardadas] = useState(false);

  useEffect(() => {
    const CLIENT_ID = localStorage.getItem('CLIENT_ID');
    const CLIENT_SECRET = localStorage.getItem('CLIENT_SECRET');
    const storedToken = localStorage.getItem('spotify_token');
    const expiration = localStorage.getItem('spotify_token_expiration');

    if (!CLIENT_ID || !CLIENT_SECRET) {
      // No hay credenciales, pedimos login
      setCredencialesGuardadas(false);
      setToken(null);
      return;
    } else {
      setCredencialesGuardadas(true);
    }

    if (storedToken && expiration && new Date().getTime() < Number(expiration)) {
      setToken(storedToken);
    } else {
      getToken();
    }
  }, []);

  const getToken = async () => {
    try {
      const CLIENT_ID = localStorage.getItem('CLIENT_ID');
      const CLIENT_SECRET = localStorage.getItem('CLIENT_SECRET');

      if (!CLIENT_ID || !CLIENT_SECRET) {
        console.error('Faltan CLIENT_ID o CLIENT_SECRET en localStorage');
        setCredencialesGuardadas(false);
        setToken(null);
        return;
      }

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
        },
        body: 'grant_type=client_credentials',
      });

      const data = await response.json();
      if (data.access_token) {
        const expirationTime = new Date().getTime() + data.expires_in * 1000;

        localStorage.setItem('spotify_token', data.access_token);
        localStorage.setItem('spotify_token_expiration', expirationTime);
        setToken(data.access_token);
        setCredencialesGuardadas(true);
      } else {
        throw new Error('No se pudo obtener el token de Spotify');
      }
    } catch (error) {
      console.error('Error al obtener token:', error);
      setToken(null);
    }
  };

  if (!credencialesGuardadas) {
    // Si no hay credenciales guardadas, mostrar login y pasar función para actualizar token
    return <Login onCredencialesGuardadas={getToken} />;
  }

  if (!token) {
    // Token no disponible todavía (por ejemplo, cargando)
    return <div>Cargando token...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio token={token} />} />
        <Route path="/artista/:id" element={<DetalleArtista token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
