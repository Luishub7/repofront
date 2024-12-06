// src/hooks/useTools.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const useTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTools = async () => {
    setLoading(true);
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tools`, {
        headers: { Authorization: `Bearer ${token}` }, // Agregar el token en el encabezado
      });
      
      setTools(response.data);
    } catch (err) {
      setError('Error al obtener herramientas');
    } finally {
      setLoading(false);
    }
  };

  const addTool = async (tool) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/tools`, tool, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTools((prevTools) => [response.data,...prevTools]); // Agregar al estado
      return true; // Indicar éxito
    } catch (err) {
      setError(err.response?.data?.message || 'Error al agregar herramienta');
      return false; // Indicar error
    }
  };

  const updateTool = async (id, updatedTool) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/tools/${id}`, updatedTool, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setTools((prevTools) =>
        prevTools.map((tool) => (tool.id === id ? response.data : tool))
      );
      return true; // Indicar éxito
    } catch (err) {
      setError(err.response?.data?.message || 'Error al modificar herramienta');
      return false; // Indicar error
    }
  };

  const deleteTool = async (id) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/tools/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTools((prevTools) => prevTools.filter((tool) => tool.id !== id));
    } catch (err) {
      setError('Error al eliminar herramienta');
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return { tools, loading, error, fetchTools, addTool, updateTool, deleteTool };
};

export default useTools;
