import { AppContext } from '../context/AppContext';
import React, { useContext, useState, useEffect } from 'react';
import './Styles/Paises.css';

const Paises = () => {
  const { paises, setPaises } = useContext(AppContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [paisEditando, setPaisEditando] = useState(null);
  const [formData, setFormData] = useState({ nombre: '' });

  // Cargar países desde el backend
  const obtenerPaises = async () => {
    try {
      const res = await fetch("http://localhost:5268/api/paises");
      const data = await res.json();
      setPaises(data);
    } catch (error) {
      console.error("Error cargando países:", error);
    }
  };

  useEffect(() => {
    obtenerPaises();
  }, []);

  // Mostrar formulario para nuevo país
  const mostrarFormularioNuevo = () => {
    setModoEdicion(false);
    setFormData({ nombre: '' });
    setIsFormVisible(true);
  };

  // Mostrar formulario para editar país
  const mostrarFormularioEditar = (pais) => {
    setModoEdicion(true);
    setPaisEditando(pais);
    setFormData({ nombre: pais.nombre });
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
        await fetch(`http://localhost:5268/api/paises/${paisEditando.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("http://localhost:5268/api/paises", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      setFormData({ nombre: '' });
      setIsFormVisible(false);
      setModoEdicion(false);
      setPaisEditando(null);
      obtenerPaises(); // Recargar países
    } catch (error) {
      console.error("Error al guardar el país:", error);
    }
  };

  const eliminarPais = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este país?')) {
      try {
        await fetch(`http://localhost:5268/api/paises/${id}`, {
          method: "DELETE",
        });
        obtenerPaises(); // Recargar países
      } catch (error) {
        console.error("Error eliminando país:", error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Lista de Países</h2>
      <button className="btn-nuevo" onClick={mostrarFormularioNuevo}>
        + Nuevo País
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="form-pais">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del País"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{modoEdicion ? 'Actualizar' : 'Guardar'}</button>
        </form>
      )}

      <table className="tabla-paises">
        <thead>
          <tr>
            <th>País</th>
          </tr>
        </thead>
        <tbody>
          {paises.map((pais) => (
            <tr key={pais.id}>
              <td>{pais.nombre}</td>
              <td>
                <button className="btn-editar" onClick={() => mostrarFormularioEditar(pais)}>
                  Editar
                </button>
                <button className="btn-eliminar" onClick={() => eliminarPais(pais.id)}>
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

export default Paises;
