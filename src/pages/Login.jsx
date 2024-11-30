import React, { useState, useContext } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
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
      navigate('/tools');
    } catch (error) {
      setAlert(error.errors ? error.errors[0] : error.response?.data?.message || 'Error al iniciar sesión.');
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
        <div className="mt-3 text-center">
          <a href="/register" className="text-decoration-none">¿No tienes una cuenta? Regístrate</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
