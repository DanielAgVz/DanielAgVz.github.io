import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext'; 
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css';

const Login = () => {
  const { setUsuarioAutenticado } = useAppContext();
  const navigate = useNavigate();
  const [credenciales, setCredenciales] = useState({ nombreUsuario: '', contraseña: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5268/api/Usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credenciales),
      });

      if (response.ok) {
        await response.json(); 
        setUsuarioAutenticado(true);
        navigate('/Peliculas');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>INICIAR SESIÓN</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombreUsuario"
            placeholder="Nombre de usuario"
            value={credenciales.nombreUsuario}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={credenciales.contraseña}
            onChange={handleChange}
            required
          />
          <button type="submit">Ingresar</button>
          {error && <p className="error">{error}</p>}
        </form>
        <span className="registro-link" onClick={() => navigate('/registro')}>Regístrate aquí</span>
      </div>
    </div>
  );
};

export default Login;
