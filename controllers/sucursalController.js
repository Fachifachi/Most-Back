// controllers/sucursalController.js
const sucursalModel = require('../models/sucursalModel');

// Obtener todas las sucursales
const getSucursales = async (req, res) => {
  try {
    const sucursales = await sucursalModel.getSucursales();
    res.json(sucursales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener sucursales' });
  }
};

// Agregar una nueva sucursal
const addSucursal = async (req, res) => {
  const { id_localidad, nombre_sucursal, cuit, inicio_actividades, ingresos_brutos, domicilio, iva, estado_sucursal } = req.body;
  try {
    const newSucursalId = await sucursalModel.addSucursal(id_localidad, nombre_sucursal, cuit, inicio_actividades, ingresos_brutos, domicilio, iva, estado_sucursal);
    res.status(201).json({ id: newSucursalId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar sucursal' });
  }
};

// Actualizar una sucursal
const updateSucursal = async (req, res) => {
  const { id_sucursal } = req.params;
  const { estado_sucursal } = req.body;
  try {
    const affectedRows = await sucursalModel.updateSucursal(id_sucursal, estado_sucursal);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    res.json({ message: 'Sucursal actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar sucursal' });
  }
};

// Eliminar (desactivar) una sucursal
const deleteSucursal = async (req, res) => {
  const { id_sucursal } = req.params;
  try {
    const affectedRows = await sucursalModel.deleteSucursal(id_sucursal);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    res.json({ message: 'Sucursal desactivada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar sucursal' });
  }
};

module.exports = {
  getSucursales,
  addSucursal,
  updateSucursal,
  deleteSucursal,
};
