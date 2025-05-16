// Funciones para obtener y manejar token de Spotify
export async function obtenerTokenSpotify() {
  const CLIENT_ID = localStorage.getItem('CLIENT_ID');
  const CLIENT_SECRET = localStorage.getItem('CLIENT_SECRET');

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Faltan las credenciales en localStorage');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', { // Corregí la URL del token
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();

  if (data.access_token) {
    const expiresAt = Date.now() + data.expires_in * 1000;
    localStorage.setItem('spotifyToken', data.access_token);
    localStorage.setItem('spotifyTokenExpiresAt', expiresAt.toString());
    return data.access_token;
  } else {
    console.error('Error al obtener el token de Spotify:', data);
    throw new Error('No se pudo obtener el token de Spotify');
  }
}

export async function obtenerTokenConCache() {
  const token = localStorage.getItem('spotifyToken');
  const expiresAt = parseInt(localStorage.getItem('spotifyTokenExpiresAt'), 10);
  const now = Date.now();

  if (!token || !expiresAt || now >= expiresAt) {
    return await obtenerTokenSpotify();
  }

  return token;
}

// Función para obtener detalles del artista
 export async function getArtist(artistId) {
  const token = await obtenerTokenConCache();
  try {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
  headers: {
  Authorization: `Bearer ${token}`,
  },
  });

  if (!response.ok) {
  const errorData = await response.json();
  console.error('Error al obtener los datos del artista:', errorData);
  throw new Error(`Error al obtener los datos del artista: ${response.status}`);
  }

  const data = await response.json();
  console.log('Datos del artista obtenidos:', data); // Log para debug
  return data;
  } catch (error) {
  console.error('Error en getArtist:', error);
  throw error; // Propaga el error para que lo maneje el componente
  }
 }

 // Función para obtener álbumes del artista
 export async function getArtistAlbums(artistId) {
  const token = await obtenerTokenConCache();
  try {
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
  headers: {
  Authorization: `Bearer ${token}`,
  },
  });

  if (!response.ok) {
  const errorData = await response.json();
  console.error('Error al obtener los álbumes del artista:', errorData);
  throw new Error(`Error al obtener los álbumes del artista: ${response.status}`);
  }

  const data = await response.json();
  console.log('Álbumes del artista obtenidos:', data); // Log para debug
  return data.items;
  } catch (error) {
  console.error('Error en getArtistAlbums:', error);
  throw error; // Propaga el error para que lo maneje el componente
  }
 }

