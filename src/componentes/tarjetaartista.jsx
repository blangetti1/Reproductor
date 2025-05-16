import React from "react";
import styles from "./TarjetaArtista.module.css";

function TarjetaArtista({ artista, onClick }) {
  return (
    <div className={styles.tarjeta} onClick={onClick}>
      <img
        src={artista.images[0]?.url}
        alt={artista.name}
        className={styles.imagen}
      />
      <p className={styles.nombre}>{artista.name}</p>
    </div>
  );
}

export default TarjetaArtista;
