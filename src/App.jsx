import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from "./componentes/pages/Inicio";

import DetalleArtista from "./componentes/pages/DetalleArtista";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/artista/:id" element={<DetalleArtista />} />
      </Routes>
    </Router>
  );
}