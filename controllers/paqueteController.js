// controllers/paqueteController.js
const paqueteModel = require('../models/paqueteModel');

// Obtener todos los paquetes
const getPaquetes = async (req, res) => {
  try {
    const paquetes = await paqueteModel.getPaquetes();
    res.json(paquetes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener paquetes' });
  }
};

// Agregar un nuevo paquete
const addPaquete = async (req, res) => {
  const { nombre_paquete, estado_paquete } = req.body;
  try {
    const newPaqueteId = await paqueteModel.addPaquete(nombre_paquete, estado_paquete);
    res.status(201).json({ id: newPaqueteId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar paquete' });
  }
};

// Actualizar un paquete
const updatePaquete = async (req, res) => {
  const { id_paquete } = req.params;
  const { estado_paquete } = req.body;
  try {
    const affectedRows = await paqueteModel.updatePaquete(id_paquete, estado_paquete);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Paquete no encontrado' });
    }
    res.json({ message: 'Paquete actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar paquete' });
  }
};

// Eliminar (desactivar) un paquete
const deletePaquete = async (req, res) => {
  const { id_paquete } = req.params;
  try {
    const affectedRows = await paqueteModel.deletePaquete(id_paquete);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Paquete no encontrado' });
    }
    res.json({ message: 'Paquete desactivado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar paquete' });
  }
};

module.exports = {
  getPaquetes,
  addPaquete,
  updatePaquete,
  deletePaquete,
};
