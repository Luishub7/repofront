// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`/auth/verify-email/${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error al verificar el correo.');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div>
      <h1>Verificación de correo</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
