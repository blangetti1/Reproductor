import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from "./pages/HomeView";
import LoginView from "./pages/LoginView";
import ArtistDetailView from "./pages/ArtistView";
import MainLayout from "./layouts/MainLayout";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomeView />} />
            <Route path="/artista/:id" element={<ArtistDetailView />} />
          </Route>
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
