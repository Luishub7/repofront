// src/components/NavbarLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLinks = () => {
  return (
    <ul className="navbar-nav me-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Inicio
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/tools">
          Herramientas
        </Link>
      </li>
    </ul>
  );
};

export default NavbarLinks;
