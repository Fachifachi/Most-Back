// controllers/turneraController.js
const armadorModel = require('../models/armadorModel');

// Obtener pedidos hechos (estado 1)
exports.getPedidosHechos = (req, res) => {
    armadorModel.getPedidosHechos((err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};
