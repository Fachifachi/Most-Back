const armadorModel = require('../models/armadorModel');

// Obtener pedidos en proceso
exports.getPedidosEnProceso = (req, res) => {
    armadorModel.getPedidosEnProceso((err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};

// Marcar pedido como hecho
exports.marcarPedidoHecho = (req, res) => {
    const { id_pedido } = req.params;
    armadorModel.marcarPedidoHecho(id_pedido, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ message: 'Pedido marcado como hecho' });
    });
};

// Obtener pedidos hechos
exports.getPedidosHechos = (req, res) => {
    armadorModel.getPedidosHechos((err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};

// Marcar pedido como entregado
exports.marcarPedidoEntregado = (req, res) => {
    const { id_pedido } = req.params;
    armadorModel.marcarPedidoEntregado(id_pedido, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ message: 'Pedido marcado como entregado' });
    });
};

// Obtener los insumos de un pedido específico
exports.getInsumosPorPedido = (req, res) => {
    const { id_pedido } = req.params;
    armadorModel.getInsumosPorPedido(id_pedido, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};
