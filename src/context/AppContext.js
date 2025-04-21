import React, { createContext, useState, useContext} from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  const [generos, setGeneros] = useState([
    { id: 1, nombre: 'Acción' },
    { id: 2, nombre: 'Comedia' },
  ]);

  const [paises, setPaises] = useState([
    { id: 1, nombre: 'Japón' },
    { id: 2, nombre: 'Estados Unidos' },
  ]);

  const [actores, setActores] = useState([
    { id: 1, nombre: 'Hayao', apellido: 'Miyazaki', pais: 'Japón' },
    { id: 2, nombre: 'Matt', apellido: 'Groening', pais: 'Estados Unidos' },
  ]);

  const [directores, setDirectores] = useState([
    { id: 1, nombre: 'Hajime', apellido: 'Isayama', nacionalidad: 'Japón' },
    { id: 2, nombre: 'Vince', apellido: 'Gilligan', nacionalidad: 'Estados Unidos' },
  ]);

  const [peliculas, setPeliculas] = useState([
    { id: 1, titulo: 'Akira', genero: 'Acción', director: 'Hayao Miyazaki' },
    { id: 2, titulo: 'The Simpsons', genero: 'Comedia', director: 'Matt Groening' },
  ]);

  

  return (
    <AppContext.Provider
      value={{
        usuarioAutenticado, 
        setUsuarioAutenticado,
        generos,
        setGeneros,
        paises,
        setPaises,
        actores,
        setActores,
        directores,
        setDirectores,
        peliculas,
        setPeliculas
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);