// src/components/UserSection.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UserSection = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {user ? (
        <div className="d-flex align-items-center">
          <span className="navbar-text me-3">Hola, {user.name}</span>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Iniciar sesión
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Registro
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default UserSection;