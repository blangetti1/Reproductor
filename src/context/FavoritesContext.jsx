import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const isFavorite = (artist) => favorites.some((fav) => fav.id === artist.id);

  const toggleFavorite = (artist) => {
    setFavorites((prev) =>
      isFavorite(artist)
        ? prev.filter((fav) => fav.id !== artist.id)
        : [...prev, artist]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
