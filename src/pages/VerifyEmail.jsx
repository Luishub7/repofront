// src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Usar el cliente Axios configurado

const VerifyEmail = () => {
    const { token } = useParams(); // Captura el token desde la URL
    const [message, setMessage] = useState(''); // Estado para el mensaje de verificación
    const navigate = useNavigate(); // Hook para navegar a otra página

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await api.get(`/auth/verify-email/${token}`); // Usa la baseURL configurada
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response?.data?.message || 'Error verifying email.');
            }
        };

        verifyToken();
    }, [token]);

    const handleNavigateToLogin = () => {
        navigate('/login'); // Navega a la página de inicio de sesión
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Email Verification</h1>
            <p>{message}</p>
            {message === 'Email verified successfully' && (
                <button
                    onClick={handleNavigateToLogin}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '20px',
                    }}
                >
                    Go to Login
                </button>
            )}
        </div>
    );
};

export default VerifyEmail;
