import axios from 'axios';

export async function obtenerTokenSpotify() {
  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization: `Basic ${btoa(
            `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return res.data.access_token;
  } catch (error) {
    console.error("Error al obtener el token de Spotify:", error);
    throw error;
  }
}

// ✅ FUNCIONES ADICIONALES

export async function getArtist(id, token) {
  try {
    const res = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener el artista:", error);
    throw error;
  }
}

export async function getArtistAlbums(id, token) {
  try {
    const res = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener los álbumes del artista:", error);
    throw error;
  }
}
