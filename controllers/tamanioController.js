// controllers/tamanioController.js
const tamanioModel = require('../models/tamanioModel');

// Obtener todos los tamaños
const getTamanios = async (req, res) => {
  try {
    const tamanios = await tamanioModel.getTamanios();
    res.json(tamanios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tamaños' });
  }
};

// Agregar un nuevo tamaño
const addTamanio = async (req, res) => {
  const { nombre_tamanio, estado_tamanio } = req.body;
  try {
    const newTamanioId = await tamanioModel.addTamanio(nombre_tamanio, estado_tamanio);
    res.status(201).json({ id: newTamanioId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar tamaño' });
  }
};

// Actualizar un tamaño
const updateTamanio = async (req, res) => {
  const { id_tamanio } = req.params;
  const { estado_tamanio } = req.body;
  try {
    const affectedRows = await tamanioModel.updateTamanio(id_tamanio, estado_tamanio);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Tamaño no encontrado' });
    }
    res.json({ message: 'Tamaño actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tamaño' });
  }
};

// Eliminar (desactivar) un tamaño
const deleteTamanio = async (req, res) => {
  const { id_tamanio } = req.params;
  try {
    const affectedRows = await tamanioModel.deleteTamanio(id_tamanio);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Tamaño no encontrado' });
    }
    res.json({ message: 'Tamaño desactivado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar tamaño' });
  }
};

module.exports = {
  getTamanios,
  addTamanio,
  updateTamanio,
  deleteTamanio,
};
