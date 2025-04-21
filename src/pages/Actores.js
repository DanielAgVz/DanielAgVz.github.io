import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import './Styles/Actores.css';

const Actores = () => {
  const { actores, setActores } = useContext(AppContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [actorEditando, setActorEditando] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    pais: '', 
  });

  const API_URL = 'http://localhost:5268/api/actores'; // Cambia puerto si es necesario
 
  // Cargar actores al inicio
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setActores(data))
      .catch((error) => console.error('Error al cargar actores:', error));
  }, []);

  const mostrarFormularioNuevo = () => {
    setModoEdicion(false);
    setFormData({ nombre: '', apellido: '', pais: '' });
    setIsFormVisible(true);
  };

  const mostrarFormularioEditar = (actor) => {
    setModoEdicion(true);
    setActorEditando(actor);
    setFormData({
      nombre: actor.nombre,
      apellido: actor.apellido,
      pais: actor.pais,
    });
    setIsFormVisible(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modoEdicion) {
      // PUT - Actualizar actor
      fetch(`${API_URL}/${actorEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((actualizado) => {
          const nuevos = actores.map((a) =>
            a.id === actorEditando.id ? actualizado : a
          );
          setActores(nuevos);
          resetForm();
        })
        .catch((err) => console.error('Error actualizando actor:', err));
    } else {
      // POST - Crear nuevo actor
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((nuevo) => {
          setActores([...actores, nuevo]);
          resetForm();
        })
        .catch((err) => console.error('Error agregando actor:', err));
    }
  };

  const eliminarActor = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este actor?')) {
      fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
        .then(() => setActores(actores.filter((a) => a.id !== id)))
        .catch((err) => console.error('Error eliminando actor:', err));
    }
  };

  const resetForm = () => {
    setFormData({ nombre: '', apellido: '', pais: '' });
    setIsFormVisible(false);
    setModoEdicion(false);
    setActorEditando(null);
  };

  return (
    <div className="container">
      <h2>Lista de Actores</h2>
      <button className="btn-nuevo" onClick={mostrarFormularioNuevo}>
        + Nuevo Actor
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="form-actor">
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
          <input
            type="text"
            name="pais"
            placeholder="País"
            value={formData.pais}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{modoEdicion ? 'Actualizar' : 'Guardar'}</button>
        </form>
      )}

      <table className="tabla-actores">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>País</th>
          </tr>
        </thead>
        <tbody>
          {actores.map((actor) => (
            <tr key={actor.id}>
              <td>{actor.nombre}</td>
              <td>{actor.apellido}</td>
              <td>{actor.pais}</td>
              <td>
                <button
                  className="btn-editar"
                  onClick={() => mostrarFormularioEditar(actor)}
                >
                  Editar
                </button>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarActor(actor.id)}
                >
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

export default Actores;
