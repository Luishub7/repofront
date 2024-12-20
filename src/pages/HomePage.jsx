import React from 'react';

const HomePage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-4">Bienvenido al Sistema de Gestión de Herramientas</h1>
        <p className="lead">Gestione sus herramientas de manera eficiente y profesional.</p>
        <a href="/tools" className="btn btn-primary btn-lg">
          Iniciar Sesion
        </a>
      </div>
    </div>
  );
};

export default HomePage;
