// src/pages/Directores.js
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import './Styles/Directores.css';

const Directores = () => {
  const { directores, setDirectores, paises, setPaises } = useContext(AppContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [directorEditando, setDirectorEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    pais: '',
  });

  useEffect(() => {
    obtenerDirectores();
    obtenerPaises();
  }, []);

  const obtenerDirectores = async () => {
    try {
      const res = await fetch("http://localhost:5268/api/directores");
      const data = await res.json();
      setDirectores(data);
    } catch (error) {
      console.error("Error al cargar directores:", error);
    }
  };

  const obtenerPaises = async () => {
    try {
      const res = await fetch("http://localhost:5268/api/paises");
      const data = await res.json();
      setPaises(data);
    } catch (error) {
      console.error("Error al cargar países:", error);
    }
  };

  const mostrarFormularioNuevo = () => {
    setModoEdicion(false);
    setFormData({ nombre: '', apellido: '', pais: '' });
    setIsFormVisible(true);
  };

  const mostrarFormularioEditar = (director) => {
    setModoEdicion(true);
    setDirectorEditando(director);
    setFormData({
      nombre: director.nombre,
      apellido: director.apellido,
      pais: director.pais,
    });
    setIsFormVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modoEdicion) {
        await fetch(`http://localhost:5268/api/directores/${directorEditando.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("http://localhost:5268/api/directores", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      setFormData({ nombre: '', apellido: '', pais: '' });
      setIsFormVisible(false);
      setModoEdicion(false);
      setDirectorEditando(null);
      obtenerDirectores();
    } catch (error) {
      console.error("Error al guardar director:", error);
    }
  };

  const eliminarDirector = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este director?')) {
      try {
        await fetch(`http://localhost:5268/api/directores/${id}`, {
          method: 'DELETE',
        });
        obtenerDirectores();
      } catch (error) {
        console.error("Error al eliminar director:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Lista de Directores</h2>
      <button className="btn-nuevo" onClick={mostrarFormularioNuevo}>
        + Nuevo Director
      </button>

      {isFormVisible && (
        <form className="form-director" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            required
          />
          <select
            name="pais"
            value={formData.pais}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar país</option>
            {paises.map((p) => (
              <option key={p.id} value={p.nombre}>
                {p.nombre}
              </option>
            ))}
          </select>
          <button type="submit">{modoEdicion ? 'Actualizar' : 'Guardar'}</button>
        </form>
      )}

      <table className="tabla-directores">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>País</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((d) => (
            <tr key={d.id}>
              <td>{d.nombre}</td>
              <td>{d.apellido}</td>
              <td>{d.pais}</td>
              <td>
                <button className="btn-editar" onClick={() => mostrarFormularioEditar(d)}>
                  Editar
                </button>
                <button className="btn-eliminar" onClick={() => eliminarDirector(d.id)}>
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

export default Directores;
