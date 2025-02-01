// controllers/cocinaController.js
const cocinaModel = require('../models/cocinaModel');

// Obtener insumos de comida pendientes
exports.getInsumosComidaPendientes = (req, res) => {
    cocinaModel.getInsumosComidaPendientes((err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};

// Marcar insumo como hecho
exports.marcarInsumoHecho = (req, res) => {
    const { id_pedido, id_insumo } = req.params;
    cocinaModel.marcarInsumoHecho(id_pedido, id_insumo, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ message: 'Insumo marcado como hecho' });
    });
};
