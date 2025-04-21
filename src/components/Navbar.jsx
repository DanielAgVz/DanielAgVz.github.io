import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Styles/Navbar.css";
import logo from '../assets/imagenes/Logo_letras.png';

const NavbarCineapp = () => {
  return (
    <Navbar expand="lg" collapseOnSelect>
      <Container className="Navbar-continer" >
        <div >
        <Nav.Link as={Link} to="/">
          <img src={logo} alt="Logo" className="logo" />
          </Nav.Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/peliculas">Películas</Nav.Link>
            <Nav.Link as={Link} to="/actores">Actores</Nav.Link>
            <Nav.Link as={Link} to="/directores">Directores</Nav.Link>
            <Nav.Link as={Link} to="/generos">Géneros</Nav.Link>
            <Nav.Link as={Link} to="/paises">Países</Nav.Link>
            <Nav.Link className="Blogin" as={Link} to="/Login">Ingresar</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCineapp;

