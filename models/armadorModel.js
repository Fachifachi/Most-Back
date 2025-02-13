const db = require('../config/db');

// Obtener pedidos en proceso (estado 0)
const getPedidosEnProceso = (callback) => {
    const sql = 'SELECT id_pedido, codigo_pedido FROM pedidos WHERE estado_pedido = 0';
    db.query(sql, callback);
};

// Marcar pedido como hecho (estado 1)
const marcarPedidoHecho = (id_pedido, callback) => {
    const sql = 'UPDATE pedidos SET estado_pedido = 1 WHERE id_pedido = ?';
    db.query(sql, [id_pedido], callback);
};

// Obtener pedidos hechos (estado 1) para la Turnera
const getPedidosHechos = (callback) => {
    const sql = `
        SELECT 
            id_pedido,
            nombre_cliente,
            codigo_pedido,
            lugar_consumo
        FROM 
            pedidos 
        WHERE 
            estado_pedido = 1
    `;
    db.query(sql, callback);
};

// Marcar pedido como entregado (estado 2)
const marcarPedidoEntregado = (id_pedido, callback) => {
    const sql = 'UPDATE pedidos SET estado_pedido = 2 WHERE id_pedido = ?';
    db.query(sql, [id_pedido], callback);
};

// Obtener los insumos de un pedido específico
const getInsumosPorPedido = (id_pedido, callback) => {
    const sql = `
        SELECT 
            i.id_insumo,
            i.nombre_insumo,
            pi.cantidad_insumo,
            pi.comentarios
        FROM 
            pedidosinsumos pi
        JOIN 
            insumos i ON pi.id_insumo = i.id_insumo
        WHERE 
            pi.id_pedido = ?
    `;
    db.query(sql, [id_pedido], callback);
};

module.exports = {
    getPedidosEnProceso,
    marcarPedidoHecho,
    getPedidosHechos,
    marcarPedidoEntregado,
    getInsumosPorPedido,
};
