import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Autentit = ({ children }) => {
  const { usuarioAutenticado } = useAppContext();

  return usuarioAutenticado ? children : <Navigate to="/login" />;
};

export default Autentit;