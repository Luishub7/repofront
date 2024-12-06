// src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [showRecoverLink, setShowRecoverLink] = useState(false); // Estado para mostrar el enlace de recuperar contraseña
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup.string().email('Correo inválido').required('Correo requerido'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña requerida'),
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate({ email, password });
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password });
      await login(response.data.token); 
      setAlert('');
      setShowRecoverLink(false); // Ocultar el enlace si el inicio de sesión es exitoso
      navigate('/tools');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión.';
      setAlert(errorMessage);

      // Mostrar el enlace de recuperar contraseña si la contraseña o el usuario son incorrectos
      if (errorMessage === 'Correo o password incorrectos') {
        setShowRecoverLink(true);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="h4 text-center mb-3">Iniciar Sesión</h1>
        {alert && <div className="alert alert-danger">{alert}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Ingrese su correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
        {showRecoverLink && (
          <div className="mt-3 text-center">
            <a href="/forgot-password" className="text-decoration-none text-primary">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        )}
        <div className="mt-3 text-center">
          <a href="/register" className="text-decoration-none">¿No tienes una cuenta? Regístrate</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
