// controllers/porcentajeIvaController.js
const porcentajeIvaModel = require('../models/porcentajeIvaModel');

// Obtener todos los porcentajes de IVA
const getPorcentajesIva = async (req, res) => {
  try {
    const porcentajesIva = await porcentajeIvaModel.getPorcentajesIva();
    res.json(porcentajesIva);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener porcentajes de IVA' });
  }
};

// Agregar un nuevo porcentaje de IVA
const addPorcentajeIva = async (req, res) => {
  const { nombre_porcentaje, descripcion_porcentaje } = req.body;
  try {
    const newPorcentajeIvaId = await porcentajeIvaModel.addPorcentajeIva(nombre_porcentaje, descripcion_porcentaje);
    res.status(201).json({ id: newPorcentajeIvaId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar porcentaje de IVA' });
  }
};

// Actualizar un porcentaje de IVA
const updatePorcentajeIva = async (req, res) => {
  const { id_porcentaje_iva } = req.params;
  const { nombre_porcentaje } = req.body;
  try {
    const affectedRows = await porcentajeIvaModel.updatePorcentajeIva(id_porcentaje_iva, nombre_porcentaje);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Porcentaje de IVA no encontrado' });
    }
    res.json({ message: 'Porcentaje de IVA actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar porcentaje de IVA' });
  }
};

// Eliminar (desactivar) un porcentaje de IVA
const deletePorcentajeIva = async (req, res) => {
  const { id_porcentaje_iva } = req.params;
  try {
    const affectedRows = await porcentajeIvaModel.deletePorcentajeIva(id_porcentaje_iva);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Porcentaje de IVA no encontrado' });
    }
    res.json({ message: 'Porcentaje de IVA eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar porcentaje de IVA' });
  }
};

module.exports = {
  getPorcentajesIva,
  addPorcentajeIva,
  updatePorcentajeIva,
  deletePorcentajeIva,
};
