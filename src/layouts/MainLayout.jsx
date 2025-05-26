import { useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { Link, Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  const location = useLocation();
  const { favorites } = useFavorites();

  const isLogin = location.pathname === "/login";

  return (
    <div className={styles.layout}>
      {!isLogin && (
        <aside className={styles.sidebar}>
          <h3>🎵 Favoritos</h3>
          {favorites.length === 0 ? (
            <p>No hay artistas favoritos.</p>
          ) : (
            <ul>
              {favorites.map((artist) => (
                <li key={artist.id}>
                  <Link to={`/artista/${artist.id}`}>{artist.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </aside>
      )}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;