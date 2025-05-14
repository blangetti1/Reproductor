import { useNavigate } from 'react-router-dom';

export default function TarjetaArtista({ artista }) {
  const navegar = useNavigate();
  return (
    <div
      onClick={() => navegar(`/artista/${artista.id}`)}
      style={{ cursor: 'pointer', border: '1px solid gray', padding: '1rem', width: '150px' }}
    >
      <img src={artista.images[0]?.url} alt={artista.name} width="100%" />
      <p>{artista.name}</p>
    </div>
  );
}