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

    // Obtener el nombre del medio de pago
    getMedioPago(id_medio_pago, (err, results) => {
        if (err) {
            console.error('Error al obtener el nombre del medio de pago:', err);
            callback(err, null); // Pasar el error al callback
            return;
        }

        const nombre_medio_pago = results[0] ? results[0].nombre_medio_pago : 'Desconocido';

        console.log("Medio de pago:", id_medio_pago, nombre_medio_pago); // Imprime el valor y el nombre

        db.query(
            `INSERT INTO tickets (id_sucursal, id_pedido, id_turno_caja, id_medio_pago, total_compra, fecha, vuelto, hora_exacta, id_caja)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id_sucursal, id_pedido, id_turno_caja, id_medio_pago, total_compra, fecha, vuelto, hora_exacta, id_caja],
            callback
        );
    });
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
        `SELECT
            t.*,  -- Select all columns from the tickets table
            s.nombre_sucursal,
            mp.nombre_medio_pago
        FROM
            tickets t
        JOIN sucursales s ON t.id_sucursal = s.id_sucursal
        JOIN mediospago mp ON t.id_medio_pago = mp.id_medio_pago
        WHERE t.id_ticket = ?`,
        [id_ticket],
        (err, ticketResults) => {
            if (err) {
                return callback(err, null);
            }

            if (ticketResults.length === 0) {
                return callback(null, null); // Ticket not found
            }

            const ticket = ticketResults[0];

            // Fetch insumos separately, including comments from pedidosinsumos
            db.query(
                `SELECT i.id_insumo, i.nombre_insumo, ti.cantidad_insumo, i.precio_insumo, pi.comentarios
                 FROM ticketsinsumos ti
                 JOIN insumos i ON ti.id_insumo = i.id_insumo
                 LEFT JOIN pedidosinsumos pi ON i.id_insumo = pi.id_insumo
                 WHERE ti.id_ticket = ?`,
                [id_ticket],
                (err, insumosResults) => {
                    if (err) {
                        return callback(err, null);
                    }

                    const ticketData = {
                        ...ticket,
                        insumos: insumosResults
                    };
                    callback(null, [ticketData]); // Wrap in array to match your controller
                }
            );
        }
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
