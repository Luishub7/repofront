// src/pages/ToolsPage.jsx
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
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    fetchTools();
  }, []);

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
    setModalError(null);
    setShowFormModal(true);
  };

  const handleDelete = (toolId) => {
    setSelectedTool(toolId);
    setModalError(null);
    setShowConfirmModal(true);
  };

  const handleAddTool = () => {
    setSelectedTool(null);
    setModalError(null);
    setShowFormModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTool(selectedTool);
      setShowConfirmModal(false);
      setSelectedTool(null);
    } catch (err) {
      setModalError('Error al eliminar la herramienta. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="container mt-4">
      {/* Barra de búsqueda y botones */}
      <div className="sticky-toolbar bg-light p-3 mb-3">
        <div className="d-flex flex-column align-items-start">
          <input
            type="text"
            placeholder="Buscar herramientas..."
            value={search}
            onChange={handleSearch}
            className="form-control w-100 w-md-50 mb-2"
          />
          <button onClick={handleAddTool} className="btn btn-primary me-2">
            Agregar Herramienta
          </button>
        </div>
      </div>

      {error && <p className="text-danger">{error}</p>}
      {modalError && <p className="text-danger">{modalError}</p>}

      {/* Tabla de herramientas con scroll interno */}
      <div className="table-container">
        <table className="table table-bordered table-hover">
          <thead className="table-primary sticky-header">
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
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      onClick={() => handleEdit(tool)}
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(tool.id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modales */}
      <ToolFormModal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        onSubmit={selectedTool ? (data) => updateTool(selectedTool.id, data) : addTool}
        initialData={selectedTool || null}
      />
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleDeleteConfirm}
        message={`¿Estás seguro de que deseas eliminar esta herramienta?`}
      />
    </div>
  );
};

export default ToolsPage;
