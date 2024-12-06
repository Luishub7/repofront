import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const { token } = useParams(); // Captura el token desde la URL
    const [message, setMessage] = useState(''); // Estado para el mensaje de verificación
    const navigate = useNavigate(); // Hook para navegar a otra página

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-email/${token}`);
                setMessage(response.data.message);
                if (response.data.message === 'Correo verificado exitosamente') {
                    setTimeout(() => navigate('/login'), 3000); // Redirige después de 3 segundos
                }
            } catch (error) {
                setMessage(error.response?.data?.message || 'Error al verificar el correo.');
            }
        };

        verifyToken();
    }, [token, navigate]);

    const handleNavigateToLogin = () => {
        navigate('/login'); // Navega a la página de inicio de sesión
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Verificación de Correo</h1>
            <p>{message}</p>
            {message === 'Correo verificado exitosamente' && (
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
                    Ir al Login
                </button>
            )}
        </div>
    );
};

export default VerifyEmail;
