import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos los componentes/páginas que estarán enrutadas
import Welcome from '../components/Welcome';
import Login from '../components/login';

// Componente que define las rutas de toda la aplicación
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz que muestra la pantalla de bienvenida */}
        <Route path="/" element={<Welcome />} />

        {/* Ruta para el formulario de login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
