import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as yup from 'yup'; // Añadido para validar los datos del formulario

const ToolFormModal = ({ show, onHide, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
  });
  const [error, setError] = useState(null); // Estado para manejar errores

  // Esquema de validación con yup
  const toolSchema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio'),
    category: yup.string().required('La categoría es obligatoria'),
    stock: yup
      .number()
      .typeError('El stock debe ser un número')
      .required('El stock es obligatorio')
      .positive('El stock debe ser un número positivo'),
    price: yup
      .number()
      .typeError('El precio debe ser un número')
      .required('El precio es obligatorio')
      .positive('El precio debe ser un número positivo'),
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', category: '', stock: '', price: '' });
    }
    setError(null); // Limpia los errores cada vez que se abre el modal
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toolSchema.validate(formData, { abortEarly: false }); // Valida los datos del formulario
      const success = await onSubmit(formData); // Espera el resultado del submit
      if (success) {
        setFormData({ name: '', category: '', stock: '', price: '' }); // Limpia el formulario
        setError(null); // Limpia errores previos
        onHide(); // Cierra el modal
      } else {
        setError('Error al guardar la herramienta. Verifica los datos.'); // Maneja el error si el backend falla
      }
    } catch (validationErrors) {
      // Maneja errores de validación de yup
      const errorMessages = validationErrors.inner.map((err) => err.message).join('. ');
      setError(errorMessages);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setFormData({ name: '', category: '', stock: '', price: '' }); // Limpia al cerrar
        setError(null); // Limpia errores
        onHide();
      }}
    >
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
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="text"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
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
