const ticketModel = require('../models/ticketModel');

exports.createTicket = (req, res) => {
    console.log('Datos recibidos en /tickets:', req.body);

    const newTicket = req.body;
    const id_sucursal = newTicket.id_sucursal;
    const id_pedido = newTicket.id_pedido;
    const id_medio_pago = newTicket.id_medio_pago;

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

            // Obtener los insumos del pedido
            console.log('Obteniendo los insumos del pedido...');
            ticketModel.getPedidoInsumos(id_pedido, (err, insumosResults) => {
                if (err) {
                    console.error('Error al obtener los insumos del pedido:', err);
                    return res.status(500).json({ message: err.message });
                }

                console.log('Insumos del pedido:', insumosResults);

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
                        id_turno_caja: null,
                        id_medio_pago: id_medio_pago,
                        total_compra: newTicket.total_compra,
                        fecha: newTicket.fecha,
                        vuelto: newTicket.vuelto
                    }, (err, createTicketResults) => {
                        if (err) {
                            console.error('Error al crear el ticket:', err);
                            return res.status(500).json({ message: err.message });
                        }

                        const id_ticket = createTicketResults.insertId;
                        console.log('Ticket creado con ID:', id_ticket);

                        // Construir el objeto del ticket
                        const ticketData = {
                            id_ticket: id_ticket,
                            sucursal: sucursal,
                            pedido: pedido,
                            insumos: insumosResults,
                            medioPago: medioPago.nombre_medio_pago,
                            totalCompra: newTicket.total_compra,
                            fecha: newTicket.fecha,
                            vuelto: newTicket.vuelto
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
    });
};

exports.getTicketById = (req, res) => {
    const id_ticket = req.params.id_ticket;

    console.log(`Obteniendo ticket con ID: ${id_ticket}`);

    // Obtener los detalles del ticket
    ticketModel.getTicketById(id_ticket, (err, ticketResults) => {
        if (err) {
            console.error('Error al obtener los detalles del ticket:', err);
            return res.status(500).json({ message: err.message });
        }

        if (ticketResults.length === 0) {
            console.log('Ticket no encontrado');
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }

        const ticket = ticketResults[0];
        const id_pedido = ticket.id_pedido;
        const id_sucursal = ticket.id_sucursal;
        const id_medio_pago = ticket.id_medio_pago;

        // Obtener detalles de la sucursal
        ticketModel.getSucursalDetails(id_sucursal, (err, sucursalResults) => {
            if (err) {
                console.error('Error al obtener detalles de la sucursal:', err);
                return res.status(500).json({ message: err.message });
            }

            const sucursal = sucursalResults[0];

            // Obtener detalles del pedido
            ticketModel.getPedidoDetails(id_pedido, (err, pedidoResults) => {
                if (err) {
                    console.error('Error al obtener detalles del pedido:', err);
                    return res.status(500).json({ message: err.message });
                }

                const pedido = pedidoResults[0];

                // Obtener los insumos del pedido
                ticketModel.getPedidoInsumos(id_pedido, (err, insumosResults) => {
                    if (err) {
                        console.error('Error al obtener los insumos del pedido:', err);
                        return res.status(500).json({ message: err.message });
                    }

                    // Obtener el nombre del medio de pago
                    ticketModel.getMedioPago(id_medio_pago, (err, medioPagoResults) => {
                        if (err) {
                            console.error('Error al obtener el nombre del medio de pago:', err);
                            return res.status(500).json({ message: err.message });
                        }

                        const medioPago = medioPagoResults[0];

                        const ticketData = {
                            id_ticket: ticket.id_ticket,
                            sucursal: sucursal,
                            pedido: pedido,
                            insumos: insumosResults,
                            medioPago: medioPago.nombre_medio_pago,
                            totalCompra: ticket.total_compra,
                            fecha: ticket.fecha,
                            vuelto: ticket.vuelto
                        };

                        res.json({
                            message: 'Ticket encontrado',
                            ticket: ticketData
                        });
                    });
                });
            });
        });
    });
};
