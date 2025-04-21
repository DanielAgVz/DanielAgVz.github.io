import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css'; // Puedes usar el mismo estilo de login

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contraseña !== formData.confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:5268/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreUsuario: formData.usuario,
          email: formData.email,
          contraseña: formData.contraseña,
        }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Error al registrar el usuario');
      }
    } catch (error) {
      setError('Error de conexión con el servidor');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>REGISTRO</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmarContraseña"
            placeholder="Confirmar contraseña"
            value={formData.confirmarContraseña}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrarse</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>
          <span className="registro-link" onClick={() => navigate('/login')}>Inicia sesión</span>
        </p>
      </div>
    </div>
  );
};

export default Registro;
