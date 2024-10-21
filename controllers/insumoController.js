// controllers/insumoController.js
const insumoModel = require('../models/insumoModel');

// Obtener todos los insumos
const getInsumos = async (req, res) => {
  try {
    const insumos = await insumoModel.getInsumos();
    res.json(insumos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener insumos' });
  }
};

// Agregar un nuevo insumo
const addInsumo = async (req, res) => {
  const { id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, estado_insumo, precio_insumo } = req.body;
  try {
    const newInsumoId = await insumoModel.addInsumo(id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, estado_insumo, precio_insumo);
    res.status(201).json({ id: newInsumoId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar insumo' });
  }
};

// Actualizar un insumo
const updateInsumo = async (req, res) => {
  const { id_insumo } = req.params;
  const { id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, estado_insumo, precio_insumo } = req.body;
  try {
    const affectedRows = await insumoModel.updateInsumo(id_insumo, id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, estado_insumo, precio_insumo);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Insumo no encontrado' });
    }
    res.json({ message: 'Insumo actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar insumo' });
  }
};

// Eliminar (desactivar) un insumo
const deleteInsumo = async (req, res) => {
  const { id_insumo } = req.params;
  try {
    const affectedRows = await insumoModel.deleteInsumo(id_insumo);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Insumo no encontrado' });
    }
    res.json({ message: 'Insumo desactivado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar insumo' });
  }
};

module.exports = {
  getInsumos,
  addInsumo,
  updateInsumo,
  deleteInsumo,
};
