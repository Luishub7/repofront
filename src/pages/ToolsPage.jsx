import React, { useState, useEffect } from 'react';
import useTools from '../hooks/useTools';
import ToolFormModal from '../components/ToolFormModal';
import ConfirmModal from '../components/ConfirmModal';

const ToolsPage = () => {
  const { tools, addTool, updateTool, deleteTool, fetchTools, error } = useTools();
  const [search, setSearch] = useState('');
  const [filteredTools, setFilteredTools] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  // Cargar herramientas al montar el componente
  useEffect(() => {
    fetchTools();
  }, []);

  // Actualizar herramientas filtradas cuando cambie la búsqueda o las herramientas
  useEffect(() => {
    const filtered = tools.filter((tool) => {
      const name = tool.name?.toLowerCase() || '';
      const category = tool.category?.toLowerCase() || '';
      return name.includes(search.toLowerCase()) || category.includes(search.toLowerCase());
    });
    setFilteredTools(filtered);
  }, [search, tools]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (tool) => {
    setSelectedTool(tool);
    setShowFormModal(true);
  };

  const handleDelete = (tool) => {
    setSelectedTool(tool);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    deleteTool(selectedTool.id);
    setShowConfirmModal(false);
  };

  const handleAddTool = () => {
    setSelectedTool(null); // Asegura un formulario limpio
    setShowFormModal(true);
  };

  return (
    <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <input
        type="text"
        placeholder="Buscar herramientas..."
        value={search}
        onChange={handleSearch}
        className="form-control w-50"
      />
      <button onClick={handleAddTool} className="btn btn-primary">
        Agregar Herramienta
      </button>
    </div>
    {error && <p className="text-danger">{error}</p>}
    <table className="table table-bordered table-hover">
      <thead className="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredTools.map((tool) => (
          <tr key={tool.id}>
            <td>{tool.name}</td>
            <td>{tool.category}</td>
            <td>{tool.stock}</td>
            <td>{tool.price}</td>
            <td>
              <button
                onClick={() => handleEdit(tool)}
                className="btn btn-warning btn-sm me-2"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(tool)}
                className="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <ToolFormModal
      show={showFormModal}
      onHide={() => setShowFormModal(false)}
      onSubmit={selectedTool ? (data) => updateTool(selectedTool.id, data) : addTool}
      initialData={selectedTool || null}
    />
    <ConfirmModal
      show={showConfirmModal}
      onHide={() => setShowConfirmModal(false)}
      onConfirm={handleConfirmDelete}
      message={`¿Estás seguro de que deseas eliminar "${selectedTool?.name}"?`}
    />
  </div>
  );
};

export default ToolsPage;
