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
    const hora_exacta = new Date().toLocaleTimeString(); // Obtener la hora exacta
    const id_caja = newTicket.id_caja;
    const pedidoInsumos = newTicket.pedidoInsumos; // Extraer pedidoInsumos de newTicket
    
    // Obtener detalles de la sucursal
    console.log('Obteniendo detalles de la sucursal...');
    ticketModel.getSucursalDetails(id_sucursal, (err, sucursalResults) => {
        if (err) {
            console.error('Error al obtener detalles de la sucursal:', err);
            return res.status(500).json({ message: err.message });
        }

        if (sucursalResults.length === 0) {
            console.log('Sucursal no encontrada');
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }

        const sucursal = sucursalResults[0];
        console.log('Detalles de la sucursal:', sucursal);

        // Obtener detalles del pedido
        console.log('Obteniendo detalles del pedido...');
        ticketModel.getPedidoDetails(id_pedido, (err, pedidoResults) => {
            if (err) {
                console.error('Error al obtener detalles del pedido:', err);
                return res.status(500).json({ message: err.message });
            }

            if (pedidoResults.length === 0) {
                console.log('Pedido no encontrado');
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }

            const pedido = pedidoResults[0];
            console.log('Detalles del pedido:', pedido);

            // Obtener el nombre del medio de pago
            console.log('Obteniendo el nombre del medio de pago...');
            ticketModel.getMedioPago(id_medio_pago, (err, medioPagoResults) => {
                if (err) {
                    console.error('Error al obtener el nombre del medio de pago:', err);
                    return res.status(500).json({ message: err.message });
                }

                const medioPago = medioPagoResults[0];
                console.log('Medio de pago:', medioPago);

                // Crear el ticket
                console.log('Creando el ticket...');
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
                }, (err, createTicketResults) => {
                    if (err) {
                        console.error('Error al crear el ticket:', err);
                        return res.status(500).json({ message: err.message });
                    }

                    const id_ticket = createTicketResults.insertId;
                    console.log('Ticket creado con ID:', id_ticket);

                    // Insertar los insumos en ticketsinsumos
                    if (pedidoInsumos) { // Verifica si pedidoInsumos está definido
                        pedidoInsumos.forEach(insumo => {
                            ticketModel.createTicketInsumos({
                                id_ticket: id_ticket,
                                id_insumo: insumo.id_insumo,
                                cantidad_insumo: insumo.cantidad,
                                precio_insumo: insumo.precio_insumo,
                                comentarios: insumo.comentarios || ''
                            }, (err) => {
                                if (err) {
                                    console.error('Error al crear ticketInsumo:', err);
                                    return res.status(500).json({ message: err.message });
                                }
                                console.log(`TicketInsumo creado para insumo ${insumo.id_insumo}`);
                            });
                        });
                    }

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

                    console.log('Ticket data:', ticketData);

                    res.status(201).json({
                        message: 'Ticket creado exitosamente',
                        ticket: ticketData,
                    });
                });
            });
        });
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
        const id_pedido = ticket.id_pedido;
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

                    // Obtener los insumos del ticket desde la tabla ticketsinsumos
                    db.query(
                        `SELECT ti.cantidad_insumo, ti.precio_insumo, ti.comentarios, i.nombre_insumo
                        FROM ticketsinsumos ti
                        JOIN insumos i ON ti.id_insumo = i.id_insumo
                        WHERE ti.id_ticket = ?`,
                        [id_ticket],
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
