import React from "react";
 import styles from "./TarjetaArtista.module.css";

 function TarjetaArtista({ artista, onClick }) {
  return (
  <div className={styles.tarjeta} onClick={onClick}>
  {artista.images && artista.images.length > 0 && artista.images[0].url ? (
  <img
  src={artista.images[0].url}
  alt={artista.name}
  className={styles.imagen}
  />
  ) : (
  <div className={styles.imagen}>No Image</div> // O puedes usar una imagen de reemplazo
  )}
  <p className={styles.nombre}>{artista.name}</p>
  </div>
  );
 }

 export default TarjetaArtista;