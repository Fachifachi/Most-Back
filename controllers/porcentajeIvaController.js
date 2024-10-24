// controllers/porcentajeIvaController.js
const porcentajeIvaModel = require('../models/porcentajeIvaModel');

// Obtener todos los porcentajes de IVA
const getPorcentajesIva = async (req, res) => {
  try {
    const porcentajes = await porcentajeIvaModel.getPorcentajesIva();
    res.status(200).json(porcentajes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los porcentajes de IVA." });
  }
};

// Agregar un nuevo porcentaje de IVA

const addPorcentajeIva = async (req, res) => {
  const { nombre_porcentaje, descripcion_porcentaje, porcentaje } = req.body;

  // Verifica si todos los campos están presentes
  if (!nombre_porcentaje || !descripcion_porcentaje || !porcentaje) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const newId = await porcentajeIvaModel.addPorcentajeIva(nombre_porcentaje, descripcion_porcentaje, porcentaje);
    res.status(201).json({ id: newId });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar el porcentaje de IVA' });
  }
};

// Actualizar un porcentaje de IVA
const updatePorcentajeIva = async (req, res) => {
  try {
    const { id_porcentaje_iva } = req.params;
    const { nombre_porcentaje, descripcion_porcentaje, porcentaje } = req.body;

    // Validar que todos los campos sean proporcionados
    if (!nombre_porcentaje || !descripcion_porcentaje || porcentaje === undefined) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const affectedRows = await porcentajeIvaModel.updatePorcentajeIva(id_porcentaje_iva, { nombre_porcentaje, descripcion_porcentaje, valor_porcentaje: porcentaje });
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Porcentaje de IVA no encontrado." });
    }

    res.status(200).json({ message: "Porcentaje de IVA actualizado con éxito." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el porcentaje de IVA." });
  }
};

// Habilitar o deshabilitar un porcentaje de IVA
const togglePorcentajeIva = async (req, res) => {
  try {
    const { id_porcentaje_iva } = req.params;
    const { activo } = req.body; // Se espera un booleano

    if (activo === undefined) {
      return res.status(400).json({ message: "Se debe especificar si se activa o desactiva." });
    }

    const affectedRows = await porcentajeIvaModel.togglePorcentajeIva(id_porcentaje_iva, activo);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Porcentaje de IVA no encontrado." });
    }

    res.status(200).json({ message: `Porcentaje de IVA ${activo ? 'activado' : 'desactivado'} con éxito.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al habilitar/deshabilitar el porcentaje de IVA." });
  }
};

module.exports = {
  getPorcentajesIva,
  addPorcentajeIva,
  updatePorcentajeIva,
  togglePorcentajeIva,
};
