// models/cocinaModel.js
const db = require('../config/db');

// Obtener insumos de comida pendientes
const getInsumosComidaPendientes = (callback) => {
    const sql = `SELECT pi.*, i.nombre_insumo FROM pedidosinsumos pi 
                 JOIN insumos i ON pi.id_insumo = i.id_insumo 
                 WHERE pi.estado_insumo_pedido = 0 AND i.id_sub_categoria IN 
                 (SELECT id_sub_categoria FROM subcategorias WHERE id_categoria = 3)`; // 3 para comidas
    db.query(sql, callback);
};

// Marcar insumo como hecho
const marcarInsumoHecho = (id_pedido, id_insumo, callback) => {
    const sql = 'UPDATE pedidosinsumos SET estado_insumo_pedido = 1 WHERE id_pedido = ? AND id_insumo = ?';
    db.query(sql, [id_pedido, id_insumo], callback);
};

module.exports = {
    getInsumosComidaPendientes,
    marcarInsumoHecho,
};
