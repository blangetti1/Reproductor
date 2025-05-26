import styles from "./AlbumCard.module.css";

const AlbumCard = ({ album }) => {
  return (
    <div className={styles.albumCard}>
      <img
        src={album.images?.[0]?.url}
        alt={album.name}
        className={styles.albumCover}
      />
      <p className={styles.albumName}>{album.name}</p>
      <p className={styles.albumDate}>{album.release_date}</p>
    </div>
  );
};

export default AlbumCard;
