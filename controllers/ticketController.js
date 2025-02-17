const ticketModel = require('../models/ticketModel');
const db = require('../config/db'); // Importa la conexión a la base de datos

exports.getAllTickets = (req, res) => {
    ticketModel.getAllTickets((err, results) => {
        if (err) {
            console.error('Error al obtener todos los tickets:', err);
            return res.status(500).json({ message: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tickets' });
        }

        res.json(results);
    });
};

exports.createTicket = (req, res) => {
    console.log('Datos recibidos en /tickets:', req.body);

    const newTicket = req.body;
    const id_sucursal = newTicket.id_sucursal;
    const id_pedido = newTicket.id_pedido;
    const id_turno_caja = newTicket.id_turno_caja;
    const id_medio_pago = newTicket.id_medio_pago;
    const total_compra = newTicket.total_compra;
    const fecha = newTicket.fecha;
    const vuelto = newTicket.vuelto;
    const hora_exacta = new Date().toLocaleTimeString();
    const id_caja = newTicket.id_caja;
    const pedidoInsumos = newTicket.pedidoInsumos;

    // Usamos Promise.all para esperar a que todas las operaciones asíncronas se completen
    Promise.all([
        ticketModel.getSucursalDetails(id_sucursal),
        ticketModel.getPedidoDetails(id_pedido),
        ticketModel.getMedioPago(id_medio_pago)
    ])
        .then(([sucursalResults, pedidoResults, medioPagoResults]) => {
            if (!sucursalResults || sucursalResults.length === 0) {
                return res.status(404).json({ message: 'Sucursal no encontrada' });
            }
            const sucursal = sucursalResults[0];

            if (!pedidoResults || pedidoResults.length === 0) {
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }
            const pedido = pedidoResults[0];

            if (!medioPagoResults || medioPagoResults.length === 0) {
                return res.status(404).json({ message: 'Medio de pago no encontrado' });
            }
            const medioPago = medioPagoResults[0];

            // Crear el ticket
            ticketModel.createTicket({
                id_sucursal: id_sucursal,
                id_pedido: id_pedido,
                id_turno_caja: id_turno_caja,
                id_medio_pago: id_medio_pago,
                total_compra: total_compra,
                fecha: fecha,
                vuelto: vuelto,
                hora_exacta: hora_exacta,
                id_caja: id_caja,
                codigo_pedido: pedido.codigo_pedido
            })
                .then(createTicketResults => {
                    const id_ticket = createTicketResults.insertId;

                    // Insertar los insumos en ticketsinsumos
                    if (pedidoInsumos) {
                        const insertPromises = pedidoInsumos.map(insumo => {
                            return ticketModel.createTicketInsumos({
                                id_ticket: id_ticket,
                                id_insumo: insumo.id_insumo,
                                cantidad_insumo: insumo.cantidad,
                                precio_insumo: insumo.precio_insumo,
                                comentarios: insumo.comentarios || ''
                            });
                        });

                        return Promise.all(insertPromises)
                            .then(() => id_ticket); // Retornar el ID del ticket para el siguiente paso
                    } else {
                        return id_ticket; // Si no hay insumos, retornar directamente el ID del ticket
                    }
                })
                .then(id_ticket => {
                    // Construir el objeto del ticket
                    const ticketData = {
                        id_ticket: id_ticket,
                        sucursal: sucursal,
                        pedido: pedido,
                        medioPago: medioPago.nombre_medio_pago,
                        totalCompra: total_compra,
                        fecha: fecha,
                        vuelto: vuelto,
                        hora_exacta: hora_exacta,
                        id_caja: id_caja,
                        codigo_pedido: pedido.codigo_pedido
                    };

                    res.status(201).json({
                        message: 'Ticket creado exitosamente',
                        ticket: ticketData,
                    });
                })
                .catch(err => {
                    console.error('Error al crear el ticket:', err);
                    return res.status(500).json({ message: err.message });
                });
        })
        .catch(err => {
            console.error('Error al obtener detalles:', err);
            return res.status(500).json({ message: err.message });
        });
};
exports.getTicketById = (req, res) => {
    const id_ticket = req.params.id_ticket;

    ticketModel.getTicketById(id_ticket, (err, ticketResults) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (ticketResults.length === 0) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }

        const ticket = ticketResults[0];
        const id_sucursal = ticket.id_sucursal;
        const id_pedido = ticket.id_pedido; // Get the id_pedido from the ticket
        const id_medio_pago = ticket.id_medio_pago

        // Obtener detalles de la sucursal
        ticketModel.getSucursalDetails(id_sucursal, (err, sucursalResults) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (sucursalResults.length === 0) {
                return res.status(404).json({ message: 'Sucursal no encontrada' });
            }

            const sucursal = sucursalResults[0];

            // Obtener detalles del pedido
            ticketModel.getPedidoDetails(id_pedido, (err, pedidoResults) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }

                if (pedidoResults.length === 0) {
                    return res.status(404).json({ message: 'Pedido no encontrado' });
                }

                const pedido = pedidoResults[0];
                ticketModel.getMedioPago(id_medio_pago, (err, medioPagoResults) => {
                    if (err) {
                        return res.status(500).json({ message: err.message });
                    }

                    const medioPago = medioPagoResults[0];

                    // Obtener los insumos del ticket desde la tabla pedidosinsumos utilizando el id_pedido
                    db.query(
                        `SELECT pi.cantidad_insumo, pi.comentarios, i.nombre_insumo, i.precio_insumo
                        FROM pedidosinsumos pi
                        JOIN insumos i ON pi.id_insumo = i.id_insumo
                        WHERE pi.id_pedido = ?`, // Use pi.id_pedido instead of ti.id_ticket
                        [id_pedido], // Use id_pedido instead of id_ticket
                        (err, ticketInsumosResults) => {
                            if (err) {
                                return res.status(500).json({ message: err.message });
                            }

                            const ticketData = {
                                ...ticket,
                                sucursal: sucursal,
                                pedido: pedido,
                                medioPago: medioPago.nombre_medio_pago,
                                insumos: ticketInsumosResults
                            };

                            res.json({
                                message: 'Ticket encontrado',
                                ticket: ticketData
                            });
                        }
                    );
                });
            });
        });
    });
};
