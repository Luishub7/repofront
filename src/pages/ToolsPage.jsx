// src/pages/ToolsPage.jsx
import React, { useState, useEffect } from 'react';
import useTools from '../hooks/useTools';
import ToolFormModal from '../components/ToolFormModal';
import ConfirmModal from '../components/ConfirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ToolsPage = () => {
  const { tools, addTool, updateTool, deleteTool, fetchTools, error } = useTools();
  const [search, setSearch] = useState('');
  const [filteredTools, setFilteredTools] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null); // Herramienta seleccionada para editar
  const [toolToDelete, setToolToDelete] = useState(null); // Herramienta seleccionada para eliminar

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
    setShowFormModal(true);
  };

  const handleDeleteClick = (toolId) => {
    setToolToDelete(toolId);
    setShowConfirmModal(true); // Mostrar el modal de confirmación
  };

  const handleConfirmDelete = () => {
    if (toolToDelete) {
      deleteTool(toolToDelete); // Eliminar la herramienta
      setToolToDelete(null); // Limpiar el estado
      setShowConfirmModal(false); // Cerrar el modal
    }
  };

  const handleAddTool = () => {
    setSelectedTool(null);
    setShowFormModal(true);
  };

  return (
    <div className="container mt-4">
      {/* Barra de búsqueda y botón Agregar */}
      <div className="sticky-toolbar bg-light p-3 mb-3">
        <div className="d-flex flex-column align-items-start">
          <input
            type="text"
            placeholder="Buscar herramientas..."
            value={search}
            onChange={handleSearch}
            className="form-control w-100 w-md-50 mb-2"
          />
          <button onClick={handleAddTool} className="btn btn-primary">
            Agregar
          </button>
        </div>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {/* Tabla de herramientas */}
      <div className="table-container">
        <table className="table table-bordered table-hover">
          <thead>
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
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(tool.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para formulario */}
      <ToolFormModal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        onSubmit={selectedTool ? (data) => updateTool(selectedTool.id, data) : addTool}
        initialData={selectedTool || null}
      />

      {/* Modal de confirmación */}
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        message={`¿Estás seguro de que deseas eliminar esta herramienta?`}
      />
    </div>
  );
};

export default ToolsPage;
