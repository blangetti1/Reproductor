import React from "react";
import styles from "./Tarjetaalbum.module.css";

function TarjetaAlbum({ album }) {
  return (
    <div className={styles.card}>
      <img
        src={album.images[0]?.url} // Asegúrate de que images exista y tenga elementos
        alt={album.name}
        className={styles["album-img"]}
      />
      <h3 className={styles["album-name"]}>{album.name}</h3>
    </div>
  );
}

export default TarjetaAlbum;