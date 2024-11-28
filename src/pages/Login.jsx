import React, { useState, useContext } from 'react';
import api from '../api/axios';
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
      const response = await api.post('/auth/login', { email, password });
      await login(response.data.token); // Actualiza el contexto con el token
      setAlert('Inicio de sesión exitoso');
      navigate('/tools');
    } catch (error) {
      setAlert(error.response?.data?.message || 'Error al iniciar sesión.');
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      {alert && <p style={{ color: 'red' }}>{alert}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
