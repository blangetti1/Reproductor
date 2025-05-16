import React from "react";
import styles from "./Tarjetaalbum.module.css";

function TarjetaAlbum({ album }) {
  return (
    <div className={styles.card}>
      <img
        src={album.imagen}
        alt={album.nombre}
        className={styles["album-img"]}
      />
      <h3 className={styles["album-name"]}>{album.nombre}</h3>
    </div>
  );
}

export default TarjetaAlbum;
