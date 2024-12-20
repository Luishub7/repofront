// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavbarLinks from './NavbarLinks';
import UserSection from './UserSection';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Sistema de Gestión de Herramientas
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <NavbarLinks />
          <UserSection />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
