import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Styles/PeliculasDetalle.css';

const PeliculasDetalles = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5268/api/peliculas/${id}`)
      .then((response) => response.json())
      .then((data) => setPelicula(data))
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [id]);

  if (!pelicula) return <p>Cargando detalles...</p>;

  return (
    <div className="detalle-container">
      <img
        src={pelicula.imagen || 'default-image.jpg'}
        alt={pelicula.titulo}
        className="detalle-img"
      />
      <h2>{pelicula.titulo}</h2>
      <p><strong>Actores:</strong> {pelicula.actorNombre}</p>
      <p><strong>Director:</strong> {pelicula.directorNombre}</p>
      <p><strong>Reseña:</strong> {pelicula.reseña}</p>
      
      {/* Reproductor de video */}
      {pelicula.enlaceVideo && (
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src={pelicula.enlaceVideo}
            title="Video de la película"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default PeliculasDetalles;
