import { useNavigate } from "react-router-dom";

import styles from "./ArtistCard.module.css";

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/artista/${artist.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        src={artist.images?.[0]?.url || "https://via.placeholder.com/64"}
        alt={artist.name}
        className={styles.avatar}
      />
      <div className={styles.info}>
        <h3 className={styles.name}>{artist.name}</h3>
        {artist.genre && <p className={styles.genre}>{artist.genres?.[0]}</p>}
      </div>
    </div>
  );
};

export default ArtistCard;
