import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const registerSchema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerSchema.validate(formData);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '-100px' }}>
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="h4 text-center mb-3">Registro</h1>
        {message && <div className={`alert ${message.includes('exitosamente') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Ingrese su nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Ingrese su correo electrónico"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
        <div className="mt-3 text-center">
          <a href="/login" className="text-decoration-none">¿Ya tienes una cuenta? Inicia Sesión</a>
        </div>
      </div>
    </div>
  );
};

export default Register;

