import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Styles/Welcome.css';
import Img1 from "../assets/imagenes/lilo&stitch.jpg"
import Img2 from "../assets/imagenes/YourName.jpg"
import Img3 from "../assets/imagenes/realph.jpg"
import logop from "../assets/imagenes/logo_pandafil.png"

const Welcome = () => {

  return (
    <div className="welcome-container">
      <div className="welcome-header">
      <div ><img src={logop} alt="Logop" className="logop" /> </div>
      <h1>Bienvenido a PANDAFILM</h1>
      <p>Gestiona géneros, actores, países, directores y películas de forma rápida y sencilla solo ingresa.</p>
      </div>
      <h2>Las joyas de PANDAFILM</h2>
      <Carousel className="carousel-container">
        <Carousel.Item>
          <img src={Img1} alt="Img1" className="Img1"/>
        </Carousel.Item>
        <Carousel.Item>
          <img img src={Img2} alt="Img2" className="Img2"/>
        </Carousel.Item>
        <Carousel.Item>
          <img img src={Img3} alt="Img3" className="Img3"/>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Welcome;
