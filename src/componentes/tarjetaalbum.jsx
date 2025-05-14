export default function TarjetaAlbum({ album }) {
  const anio = album.release_date?.split('-')[0];
  return (
    <div style={{ border: '1px solid gray', padding: '1rem', width: '150px' }}>
      <img src={album.images[0]?.url} alt={album.name} width="100%" />
      <p>{album.name}</p>
      <small>{anio}</small>
    </div>
  );
}