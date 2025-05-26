import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArtist } from "../services/artist.service";
import { getAlbumsByArtistId } from "../services/album.service";
import { useFavorites } from "../context/FavoritesContext";

import styles from "./ArtistView.module.css";
import AlbumCard from "../components/AlbumCard";

const ArtistDetailView = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleBack = () => navigate("/");

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistData, albumsData] = await Promise.all([
          getArtist(id),
          getAlbumsByArtistId(id),
        ]);
        setArtist(artistData);
        setAlbums(albumsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Cargando artista...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.artistDetail}>
      <button onClick={handleBack} className={styles.backButton}>
        ← Volver al inicio
      </button>
      <div className={styles.artistHeader}>
        <img
          src={artist.images?.[0]?.url}
          alt={artist.name}
          className={styles.artistImage}
        />
        <div>
          <h2>{artist.name}</h2>
          <p>Popularidad: {artist.popularity}</p>
          <p>Seguidores: {artist.followers?.total.toLocaleString()}</p>
          <p>Géneros: {artist.genres.join(", ")}</p>
        </div>
      </div>

      <button
        onClick={() => toggleFavorite(artist)}
        className={styles.favButton}
      >
        {isFavorite(artist) ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
      </button>

      <h3>Álbumes</h3>
      <div className={styles.albumGrid}>
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default ArtistDetailView;
