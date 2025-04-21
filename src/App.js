import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppContext'; // Importar el proveedor
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RutaProtegida from './components/Autentit';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Navbar from './components/Navbar'; // Importamos el menú
import Welcome from './pages/Welcome';
import Directores from './pages/Directores';
import Generos from './pages/Generos';
import Paises from './pages/Paises';
import Actores from './pages/Actores';
import Peliculas from './pages/Peliculas';
import PeliculaDetalle from "./pages/PeliculaDetalle";


const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          {/* Rutas protegidas */}
          <Route path="/Directores" element={<RutaProtegida><Directores /></RutaProtegida>} />
          <Route path="/actores" element={<RutaProtegida><Actores /></RutaProtegida>} />
          <Route path="/generos" element={<RutaProtegida><Generos /></RutaProtegida>} />
          <Route path="/paises" element={<RutaProtegida><Paises /></RutaProtegida>} />
          <Route path="/Peliculas" element={<RutaProtegida><Peliculas /></RutaProtegida>} />
          <Route path="/peliculas/:id" element={<PeliculaDetalle />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}


export default App;
