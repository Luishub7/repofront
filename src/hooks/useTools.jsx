import { useState, useEffect } from 'react';
import api from '../api/axios'; // Importa la instancia configurada

const useTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tools');
      setTools(response.data);
    } catch (err) {
      setError('Error al obtener herramientas');
    } finally {
      setLoading(false);
    }
  };

  const addTool = async (tool) => {
    try {
      const response = await api.post('/tools', tool);
      setTools((prevTools) => [...prevTools, response.data]);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al agregar herramienta');
      return false;
    }
  };

  const updateTool = async (id, updatedTool) => {
    try {
      const response = await api.put(`/tools/${id}`, updatedTool);
      setTools((prevTools) =>
        prevTools.map((tool) => (tool.id === id ? response.data : tool))
      );
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al modificar herramienta');
      return false;
    }
  };

  const deleteTool = async (id) => {
    try {
      await api.delete(`/tools/${id}`);
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
