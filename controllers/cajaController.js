const Caja = require('../models/cajaModel');

// Obtener todas las cajas
const getAllCajas = (req, res) => {
    Caja.getAllCajas((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Crear una nueva caja
const createCaja = (req, res) => {
    const newCaja = {
        numero_caja: req.body.numero_caja,
        estado_caja: req.body.estado_caja || 1 // Se establece como habilitada por defecto
    };
    
    Caja.createCaja(newCaja, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Caja creada con éxito', data: results });
    });
};

// Actualizar una caja
const updateCaja = (req, res) => {
    const { id } = req.params;
    const updatedCaja = req.body;

    Caja.updateCaja(id, updatedCaja, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Caja actualizada con éxito', data: results });
    });
};

// Cambiar el estado de una caja
const toggleStatus = (req, res) => {
    const { id } = req.params;

    Caja.toggleStatus(id, (err, result) => {
        if (err) {
            console.error('Error al cambiar estado de la caja:', err);
            return res.status(500).send('Error al cambiar el estado de la caja');
        }

        // Verifica si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).send('Caja no encontrada');
        }

        res.status(200).send('Estado de la caja actualizado');
    });
};

module.exports = {
    getAllCajas,
    createCaja,
    updateCaja,
    toggleStatus,
};
