import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/reset-password', { token, newPassword });
            setMessage(response.data.message);
            if (response.data.message === 'Contraseña restablecida exitosamente, en instantantes sera redirigido al inicio de sesion') {
                setTimeout(() => navigate('/login'), 3000); // Redirige después de 3 segundos
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error al restablecer la contraseña.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Restablecer Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Restablecer</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default ResetPassword;
