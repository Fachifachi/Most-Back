const PorcentajeIva = require('../models/porcentajeIvaModel');

// Obtener todos los porcentajes de IVA
const getAllPorcentajesIva = (req, res) => {
    PorcentajeIva.getAllPorcentajesIva((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Crear un nuevo porcentaje de IVA
const createPorcentajeIva = (req, res) => {
    const newPorcentajeIva = req.body;
    PorcentajeIva.createPorcentajeIva(newPorcentajeIva, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Porcentaje de IVA creado con éxito', data: results });
    });
};

// Actualizar un porcentaje de IVA
const updatePorcentajeIva = (req, res) => {
    const { id } = req.params;
    const updatedPorcentajeIva = req.body;
    PorcentajeIva.updatePorcentajeIva(id, updatedPorcentajeIva, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Porcentaje de IVA actualizado con éxito', data: results });
    });
};

// Deshabilitar un porcentaje de IVA
const disablePorcentajeIva = (req, res) => {
    const { id } = req.params;
    PorcentajeIva.disablePorcentajeIva(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Porcentaje de IVA deshabilitado con éxito', data: results });
    });
};

// Alternar el estado de habilitado/deshabilitado
const toggleStatus = (req, res) => {
    const { id } = req.params;
    PorcentajeIva.toggleStatus(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Estado del porcentaje de IVA cambiado con éxito', data: results });
    });
};

module.exports = {
    getAllPorcentajesIva,
    createPorcentajeIva,
    updatePorcentajeIva,
    disablePorcentajeIva,
    toggleStatus
};
