const db = require('../config/db');

const createTicket = (ticket, callback) => {
    const {
        id_sucursal,
        id_pedido,
        id_turno_caja,
        id_medio_pago,
        total_compra,
        fecha,
        vuelto,
        hora_exacta,
        id_caja
    } = ticket;

    db.query(
        `INSERT INTO tickets (id_sucursal, id_pedido, id_turno_caja, id_medio_pago, total_compra, fecha, vuelto, hora_exacta, id_caja)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id_sucursal, id_pedido, id_turno_caja, id_medio_pago, total_compra, fecha, vuelto, hora_exacta, id_caja],
        callback
    );
};

const getSucursalDetails = (id_sucursal, callback) => {
    db.query(
        `SELECT * FROM sucursales WHERE id_sucursal = ?`,
        [id_sucursal],
        callback
    );
};

const getPedidoDetails = (id_pedido, callback) => {
    db.query(
        `SELECT * FROM pedidos WHERE id_pedido = ?`,
        [id_pedido],
        callback
    );
};

const getPedidoInsumos = (id_pedido, callback) => {
    db.query(
        `SELECT pi.cantidad_insumo, pi.comentarios, i.nombre_insumo, i.precio_insumo
        FROM pedidosinsumos pi
        JOIN insumos i ON pi.id_insumo = i.id_insumo
        WHERE pi.id_pedido = ?`,
        [id_pedido],
        callback
    );
};

const getMedioPago = (id_medio_pago, callback) => {
    db.query(
        `SELECT nombre_medio_pago FROM mediospago WHERE id_medio_pago = ?`,
        [id_medio_pago],
        callback
    );
};

const createTicketInsumos = (ticketInsumos, callback) => {
    const {
        id_ticket,
        id_insumo,
        cantidad_insumo,
        precio_insumo,
        comentarios
    } = ticketInsumos;

    db.query(
        `INSERT INTO ticketsinsumos (id_ticket, id_insumo, cantidad_insumo, precio_insumo, comentarios)
        VALUES (?, ?, ?, ?, ?)`,
        [id_ticket, id_insumo, cantidad_insumo, precio_insumo, comentarios],
        callback
    );
};

const getTicketById = (id_ticket, callback) => {
    db.query(
        `SELECT tickets.*, cajas.numero_caja, pedidos.codigo_pedido
        FROM tickets
        JOIN turnoscaja ON tickets.id_turno_caja = turnoscaja.id_turno_caja
        JOIN cajas ON turnoscaja.id_caja = cajas.id_caja
        JOIN pedidos ON tickets.id_pedido = pedidos.id_pedido
        WHERE tickets.id_ticket = ?`,
        [id_ticket],
        callback
    );
};

const getAllTickets = (callback) => {
    db.query(
        `SELECT * FROM tickets`,
        callback
    );
};

module.exports = {
    createTicket,
    getSucursalDetails,
    getPedidoDetails,
    getPedidoInsumos,
    getMedioPago,
    getTicketById,
    createTicketInsumos,
    getAllTickets
};
