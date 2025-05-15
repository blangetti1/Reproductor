import { useNavigate } from 'react-router-dom';

export default function TarjetaArtista({ artista }) {
  const navegar = useNavigate();
  return (
    <div
      onClick={() => navegar(`/artista/${artista.id}`)}
      div className="tarjeta-artista"
    >
      <img src={artista.images[0]?.url} alt={artista.name} width="100%" />
      <p>{artista.name}</p>
    </div>
  );
}
