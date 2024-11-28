// src/components/ToolFormModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ToolFormModal = ({ show, onHide, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
  });
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', category: '', stock: '', price: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData); // Espera el resultado del submit
    if (success) {
      setFormData({ name: '', category: '', stock: '', price: '' }); // Limpia el formulario
      setError(null); // Limpia errores previos
      onHide(); // Cierra el modal
    } else {
      setError('Error al guardar la herramienta. Verifica los datos.'); // Maneja el error
    }
  };

  return (
    <Modal show={show} onHide={() => {
      setFormData({ name: '', category: '', stock: '', price: '' }); // Limpia al cerrar
      setError(null); // Limpia errores
      onHide();
    }}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Editar Herramienta' : 'Agregar Herramienta'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="mt-3 d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ToolFormModal;
