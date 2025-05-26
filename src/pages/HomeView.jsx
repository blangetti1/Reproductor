import { useState } from "react";
import { searchArtist } from "../services/artist.service";
import Input from "../components/Input";
import ArtistCard from "../components/ArtistCard";

const HomeView = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const results = await searchArtist(search);
      setArtists(results);
    } catch (error) {
      console.error("Error fetching artists:", error);
      setArtists([]); // Podés mostrar un mensaje de error si querés
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input
          label="Buscar artista"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {/* Estado de carga */}
      {loading && <p>Cargando artistas...</p>}

      {/* Resultados */}
      {!loading && hasSearched && (
        <>
          {artists.length > 0 ? (
            <ul>
              {artists.map((artist, index) => (
                <ArtistCard artist={artist} key={index} />
              ))}
            </ul>
          ) : (
            <p>No se encontraron artistas.</p>
          )}
        </>
      )}
    </div>
  );
};

export default HomeView;
