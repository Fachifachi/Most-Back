// controllers/medioPagoController.js
const medioPagoModel = require('../models/medioPagoModel');

// Obtener todos los medios de pago
const getMediosPago = async (req, res) => {
  try {
    const mediosPago = await medioPagoModel.getMediosPago();
    res.json(mediosPago);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener medios de pago' });
  }
};

// Agregar un nuevo medio de pago
const addMedioPago = async (req, res) => {
  const { nombre_medio_pago, descripcion_medio_pago } = req.body;
  try {
    const newMedioPagoId = await medioPagoModel.addMedioPago(nombre_medio_pago, descripcion_medio_pago);
    res.status(201).json({ id: newMedioPagoId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar medio de pago' });
  }
};

// Actualizar un medio de pago
const updateMedioPago = async (req, res) => {
  const { id_medio_pago } = req.params;
  const { nombre_medio_pago, descripcion_medio_pago } = req.body;
  try {
    const affectedRows = await medioPagoModel.updateMedioPago(id_medio_pago, nombre_medio_pago, descripcion_medio_pago);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Medio de pago no encontrado' });
    }
    res.json({ message: 'Medio de pago actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar medio de pago' });
  }
};

// Eliminar (desactivar) un medio de pago
const deleteMedioPago = async (req, res) => {
  const { id_medio_pago } = req.params;
  try {
    const affectedRows = await medioPagoModel.deleteMedioPago(id_medio_pago);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Medio de pago no encontrado' });
    }
    res.json({ message: 'Medio de pago desactivado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar medio de pago' });
  }
};

module.exports = {
  getMediosPago,
  addMedioPago,
  updateMedioPago,
  deleteMedioPago,
};
