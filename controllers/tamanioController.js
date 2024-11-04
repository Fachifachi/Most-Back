const tamanioModel = require('../models/tamanioModel');

// Obtener todos los tamaños
const getTamanios = async (req, res) => {
  const { search = '', filter = 'all', order = 'asc' } = req.query;
  try {
    const tamanios = await tamanioModel.getTamanios(search, filter, order);
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
  const { nombre_tamanio, estado_tamanio } = req.body;
  try {
    const affectedRows = await tamanioModel.updateTamanio(id_tamanio, nombre_tamanio, estado_tamanio);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Tamaño no encontrado' });
    }
    res.json({ message: 'Tamaño actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tamaño' });
  }
};

// (desactivar) un tamaño
const toggleTamanio = async (req, res) => {
  const { id_tamanio } = req.params;
  try {
    const tamanio = await tamanioModel.getTamaniosById(id_tamanio);
    if (!tamanio) {
      return res.status(404).json({ error: 'Tamaño no encontrado' });
    }

    const newEstado = tamanio.estado_tamanio === 1 ? 0 : 1; // Cambia el estado
    await tamanioModel.updateTamanio(id_tamanio, tamanio.nombre_tamanio, newEstado);
    res.json({ message: 'Estado del tamaño actualizado', newEstado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar estado de tamaño' });
  }
};

module.exports = {
  getTamanios,
  addTamanio,
  updateTamanio,
  toggleTamanio,
};
