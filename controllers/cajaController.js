// controllers/cajaController.js
const cajaModel = require('../models/cajaModel');

// Obtener todas las cajas
const getCajas = async (req, res) => {
  try {
    const cajas = await cajaModel.getCajas();
    res.json(cajas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cajas' });
  }
};

// Agregar una nueva caja
const addCaja = async (req, res) => {
  const { numero_caja, estado_caja } = req.body;
  try {
    const newCajaId = await cajaModel.addCaja(numero_caja, estado_caja);
    res.status(201).json({ id: newCajaId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar caja' });
  }
};

// Actualizar el estado de una caja
const updateCaja = async (req, res) => {
  const { id_caja } = req.params;
  const { estado_caja } = req.body;
  try {
    const affectedRows = await cajaModel.updateCaja(id_caja, estado_caja);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Caja no encontrada' });
    }
    res.json({ message: 'Caja actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar caja' });
  }
};

// Eliminar (desactivar) una caja
const deleteCaja = async (req, res) => {
  const { id_caja } = req.params;
  try {
    const affectedRows = await cajaModel.deleteCaja(id_caja);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Caja no encontrada' });
    }
    res.json({ message: 'Caja desactivada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar caja' });
  }
};

module.exports = {
  getCajas,
  addCaja,
  updateCaja,
  deleteCaja,
};
