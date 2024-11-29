// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Página No Encontrada</h1>
      <p>La página que estás buscando no existe.</p>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;