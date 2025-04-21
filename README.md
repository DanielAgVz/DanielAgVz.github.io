# CineApp - Frontend 🎬

Este es el frontend de **CineApp**, una aplicación web para gestionar películas, actores, directores, géneros y países. La aplicación permite crear, visualizar, editar y eliminar películas, todo desde una interfaz amigable desarrollada con **React**.

## Tecnologías utilizadas

- React
- JavaScript (ES6+)
- HTML5 / CSS3
- Fetch API
- Context API

## Características

- Visualización de películas con imagen, reseña, tráiler y detalles asociados.
- Creación de nuevas películas con formulario dinámico.
- Vista directa de todos los detalles de cada película en una misma página.
- Gestión de imagen por `drag & drop` o carga manual.
- Consumo de una API RESTful desarrollada en .NET Core.

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/tuusuario/cineapp-frontend.git
cd cineapp-frontend


2. Intalacin de dependencias
npm install

3. Inicia la aplicación:

npm start
La app se ejecutará en http://localhost:3000.

Estructura de la carpeta 

src/
├── page/
│   └── Peliculas.js
├── Styles/
│   └── Peliculas.css
├── App.js
└── index.js
