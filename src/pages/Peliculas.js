import React, { useEffect, useState } from "react";
import "./Styles/Peliculas.css";

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [actores, setActores] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [paises, setPaises] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    titulo: "",
    reseña: "",
    imagen: "",
    enlaceVideo: "",
    generoId: "",
    paisId: "",
    actorId: "",
    directorId: "",
  });

  useEffect(() => {
    obtenerPeliculas();
    obtenerActores();
    obtenerDirectores();
    obtenerGeneros();
    obtenerPaises();
  }, []);

  const obtenerPeliculas = async () => {
    const res = await fetch("http://localhost:5268/api/peliculas");
    const data = await res.json();
    setPeliculas(data);
  };

  const obtenerActores = async () => {
    const res = await fetch("http://localhost:5268/api/actores");
    setActores(await res.json());
  };

  const obtenerDirectores = async () => {
    const res = await fetch("http://localhost:5268/api/directores");
    setDirectores(await res.json());
  };

  const obtenerGeneros = async () => {
    const res = await fetch("http://localhost:5268/api/generos");
    setGeneros(await res.json());
  };

  const obtenerPaises = async () => {
    const res = await fetch("http://localhost:5268/api/paises");
    setPaises(await res.json());
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const guardarPelicula = async () => {
    const metodo = modoEdicion ? "PUT" : "POST";
    const url = modoEdicion
      ? `http://localhost:5268/api/peliculas/${formData.id}`
      : "http://localhost:5268/api/peliculas";

    await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setFormData({
      id: 0,
      titulo: "",
      reseña: "",
      imagen: "",
      enlaceVideo: "",
      generoId: "",
      paisId: "",
      actorId: "",
      directorId: "",
    });
    setModoEdicion(false);
    obtenerPeliculas();
  };

  const eliminarPelicula = async (id) => {
    await fetch(`http://localhost:5268/api/peliculas/${id}`, {
      method: "DELETE",
    });
    obtenerPeliculas();
  };

  const cargarPelicula = (pelicula) => {
    setFormData({
      id: pelicula.id,
      titulo: pelicula.titulo,
      reseña: pelicula.reseña,
      imagen: pelicula.imagen,
      enlaceVideo: pelicula.enlaceVideo,
      generoId: pelicula.generoId,
      paisId: pelicula.paisId,
      actorId: pelicula.actorId,
      directorId: pelicula.directorId,
    });
    setModoEdicion(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const transformarUrlVideo = (url) => {
    if (!url) return "";
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  return (
    <div className="container">
      <h2>{modoEdicion ? "Editar Película" : "Agregar Película"}</h2>

      <div className="form-pelicula">
        <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" />
        <textarea name="reseña" value={formData.reseña} onChange={handleChange} placeholder="Reseña" />

        <select name="generoId" value={formData.generoId} onChange={handleChange}>
          <option value="">Seleccionar Género</option>
          {generos.map((g) => (
            <option key={g.id} value={g.id}>{g.nombre}</option>
          ))}
        </select>

        <select name="paisId" value={formData.paisId} onChange={handleChange}>
          <option value="">Seleccionar País</option>
          {paises.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>

        <select name="actorId" value={formData.actorId} onChange={handleChange}>
          <option value="">Seleccionar Actor</option>
          {actores.map((a) => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </select>

        <select name="directorId" value={formData.directorId} onChange={handleChange}>
          <option value="">Seleccionar Director</option>
          {directores.map((d) => (
            <option key={d.id} value={d.id}>{d.nombre}</option>
          ))}
        </select>

        <input name="enlaceVideo" value={formData.enlaceVideo} onChange={handleChange} placeholder="URL Trailer YouTube" />

        <div className="imagen-container">
          <div
            className="drop-zone"
            onClick={() => document.getElementById("fileInput").click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFormData({ ...formData, imagen: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }}
          >
            {formData.imagen ? (
              <div className="preview-container">
                <img src={formData.imagen} alt="Vista previa" className="preview-img" />
                <button
                  type="button"
                  className="btn-eliminar-imagen"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData({ ...formData, imagen: "" });
                  }}
                >
                  Eliminar Imagen
                </button>
              </div>
            ) : (
              <p>Haz clic o arrastra una imagen aquí</p>
            )}
          </div>
        </div>


        <button onClick={guardarPelicula}>{modoEdicion ? "Actualizar" : "Guardar"}</button>
      </div>

      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setFormData({ ...formData, imagen: reader.result });
            };
            reader.readAsDataURL(file);
          }
        }}
      />

      <div className="peliculas-grid">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="pelicula-card">
            {pelicula.imagen && <img src={pelicula.imagen} alt={pelicula.titulo} />}
            <h3>{pelicula.titulo}</h3>
            <p><strong>Director ID:</strong> {pelicula.directorId}</p>
            <p><strong>Actor ID:</strong> {pelicula.actorId}</p>
            <p><strong>Género ID:</strong> {pelicula.generoId}</p>
            <p><strong>País ID:</strong> {pelicula.paisId}</p>
            <p><strong>Reseña:</strong> {pelicula.reseña}</p>

            {pelicula.enlaceVideo ? (
              <div className="video-container">
                <iframe
                  width="100%"
                  height="200"
                  src={transformarUrlVideo(pelicula.enlaceVideo)}
                  title={pelicula.titulo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p><strong>Enlace Video:</strong> No disponible</p>
            )}

            <button onClick={() => cargarPelicula(pelicula)}>Editar</button>
            <button onClick={() => eliminarPelicula(pelicula.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Peliculas;
