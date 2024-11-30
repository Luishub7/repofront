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
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

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

  const handleDelete = () => {
    selectedTools.forEach((toolId) => deleteTool(toolId));
    setShowConfirmModal(false);
    setSelectedTools([]);
  };

  const handleSelectTool = (toolId) => {
    setSelectedTools((prevSelected) => {
      if (prevSelected.includes(toolId)) {
        return prevSelected.filter((id) => id !== toolId);
      } else {
        return [...prevSelected, toolId];
      }
    });
  };

  const handleAddTool = () => {
    setSelectedTool(null);
    setShowFormModal(true);
  };

  const isMultipleSelected = selectedTools.length > 1;

  return (
    <div className="container mt-4">
      {/* Contenedor fijo para la barra de búsqueda y botones */}
      <div className="sticky-toolbar bg-light p-3 mb-3">
        <div className="d-flex flex-column align-items-start">
          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar herramientas..."
            value={search}
            onChange={handleSearch}
            className="form-control w-100 w-md-50 mb-2"
          />

          {/* Botones de Agregar y Eliminar Herramienta */}
          <div className="d-flex">
            <button onClick={handleAddTool} className="btn btn-primary me-2" disabled={isMultipleSelected}>
              Agregar Herramienta
            </button>
            <button className="btn btn-danger"
              onClick={() => setShowConfirmModal(true)}
              disabled={selectedTools.length === 0}
            >
              Eliminar Herramientas Seleccionadas
            </button>
          </div>
        </div>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {/* Contenedor que controla el scroll para la tabla */}
      <div className="table-container">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Seleccionar</th>
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
                <td>
                  <input
                    type="checkbox"
                    checked={selectedTools.includes(tool.id)}
                    onChange={() => handleSelectTool(tool.id)}
                  />
                </td>
                <td>{tool.name}</td>
                <td>{tool.category}</td>
                <td>{tool.stock}</td>
                <td>{tool.price}</td>
                <td>
                  <button
                    onClick={() => handleEdit(tool)}
                    className="btn btn-warning btn-sm me-2"
                    disabled={isMultipleSelected}
                  >
                    Editar
                  </button>
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
        onConfirm={handleDelete}
        message={`¿Estás seguro de que deseas eliminar las herramientas seleccionadas?`}
      />
    </div>
  );
};

export default ToolsPage;
