// src/pages/Generos.js
import { AppContext } from '../context/AppContext';
import React, { useContext, useState, useEffect } from 'react';
import './Styles/Generos.css';

const Generos = () => {
  const { generos, setGeneros } = useContext(AppContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [generoEditando, setGeneroEditando] = useState(null);
  const [formData, setFormData] = useState({ nombre: '' });

  // Cargar géneros desde el backend
  const obtenerGeneros = async () => {
    try {
      const res = await fetch("http://localhost:5268/api/generos");
      const data = await res.json();
      setGeneros(data);
    } catch (error) {
      console.error("Error cargando géneros:", error);
    }
  };

  useEffect(() => {
    obtenerGeneros();
  }, []);

  // Mostrar formulario para nuevo género
  const mostrarFormularioNuevo = () => {
    setModoEdicion(false);
    setFormData({ nombre: '' });
    setIsFormVisible(true);
  };

  // Mostrar formulario para editar género
  const mostrarFormularioEditar = (genero) => {
    setModoEdicion(true);
    setGeneroEditando(genero);
    setFormData({ nombre: genero.nombre });
    setIsFormVisible(true);
  };

  // Manejo de cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modoEdicion) {
        await fetch(`http://localhost:5268/api/generos/${generoEditando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("http://localhost:5268/api/generos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      setFormData({ nombre: '' });
      setIsFormVisible(false);
      setModoEdicion(false);
      setGeneroEditando(null);
      obtenerGeneros(); // recargar géneros
    } catch (error) {
      console.error("Error al guardar el género:", error);
    }
  };

  const eliminarGenero = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este género?')) {
      try {
        await fetch(`http://localhost:5268/api/generos/${id}`, {
          method: "DELETE",
        });
        obtenerGeneros();
      } catch (error) {
        console.error("Error eliminando género:", error);
      }
    }
  };
return (
    <div className="container">
      <h2>Lista de Géneros</h2>
      <button className="btn-nuevo" onClick={mostrarFormularioNuevo}>
        + Nuevo Género
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="form-genero">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del Género"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{modoEdicion ? 'Actualizar' : 'Guardar'}</button>
        </form>
      )}

      <table className="tabla-generos">
        <thead>
          <tr>
            <th>Género</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero) => (
            <tr key={genero.id}>
              <td>{genero.nombre}</td>
              <td>
                <button className="btn-editar" onClick={() => mostrarFormularioEditar(genero)}>
                  Editar
                </button>
                <button className="btn-eliminar" onClick={() => eliminarGenero(genero.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Generos;
