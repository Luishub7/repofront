// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from '../api/axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error al enviar el correo');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Recuperar Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enviar Enlace</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default ForgotPassword;
