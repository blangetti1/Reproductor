import axios from 'axios';

export async function getSpotifyToken() {
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

