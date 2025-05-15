export default function TarjetaAlbum({ album }) {
  const anio = album.release_date?.split('-')[0];
  return (
    <div className="tarjeta-album">
      <img src={album.images[0]?.url} alt={album.name} width="100%" />
      <p>{album.name}</p>
      <small>{anio}</small>
    </div>
  );
}