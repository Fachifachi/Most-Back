// models/armadorModel.js
const db = require('../config/db');

// Obtener pedidos en proceso (estado 0)
const getPedidosEnProceso = (callback) => {
    const sql = 'SELECT * FROM pedidos WHERE estado_pedido = 0';
    db.query(sql, callback);
};

// Marcar pedido como hecho (estado 1)
const marcarPedidoHecho = (id_pedido, callback) => {
    const sql = 'UPDATE pedidos SET estado_pedido = 1 WHERE id_pedido = ?';
    db.query(sql, [id_pedido], callback);
};

// Obtener pedidos hechos (estado 1)
const getPedidosHechos = (callback) => {
    const sql = 'SELECT * FROM pedidos WHERE estado_pedido = 1';
    db.query(sql, callback);
};

// Marcar pedido como entregado (estado 2)
const marcarPedidoEntregado = (id_pedido, callback) => {
    const sql = 'UPDATE pedidos SET estado_pedido = 2 WHERE id_pedido = ?';
    db.query(sql, [id_pedido], callback);
};

module.exports = {
    getPedidosEnProceso,
    marcarPedidoHecho,
    getPedidosHechos,
    marcarPedidoEntregado,
};
