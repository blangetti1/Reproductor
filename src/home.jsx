import { useState, useEffect } from 'react';
import { getSpotifyToken } from '../utils/getSpotifyToken';
import axios from 'axios';
import ArtistCard from '../components/ArtistCard';  

function Home() {
  const [search, setSearch] = useState('');
  const [artists, setArtists] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    getSpotifyToken().then(setToken);
  }, []);

  const handleSearch = async () => {
    if (!search) return;
    const res = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: search,
        type: 'artist',
        limit: 10,
      },
    });
    setArtists(res.data.artists.items);
  };

  return (
    <div>
      <h1>Buscar Artistas</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Nombre del artista"
      />
      <button onClick={handleSearch}>Buscar</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default Home;
