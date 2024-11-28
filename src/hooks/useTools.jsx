// src/hooks/useTools.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const useTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tools`);
      setTools(response.data);
    } catch (err) {
      setError('Error al obtener herramientas');
    } finally {
      setLoading(false);
    }
  };

  const addTool = async (tool) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/tools`, tool);
      setTools((prevTools) => [...prevTools, response.data]); // Agregar al estado
      return true; // Indicar éxito
    } catch (err) {
      setError(err.response?.data?.message || 'Error al agregar herramienta');
      return false; // Indicar error
    }
  };

  const updateTool = async (id, updatedTool) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/tools/${id}`, updatedTool);
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
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/tools/${id}`);
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
