// routes/armadorRoutes.js
const express = require('express');
const router = express.Router();
const armadorController = require('../controllers/armadorController');

// Obtener pedidos en proceso
router.get('/pedidos/en-proceso', armadorController.getPedidosEnProceso);

// Marcar pedido como hecho
router.put('/pedidos/hecho/:id_pedido', armadorController.marcarPedidoHecho);

// Obtener pedidos hechos
router.get('/pedidos/hechos', armadorController.getPedidosHechos);

// Marcar pedido como entregado
router.put('/pedidos/entregado/:id_pedido', armadorController.marcarPedidoEntregado);

module.exports = router;
