const express = require('express');
const armadorController = require('../controllers/armadorController');
const router = express.Router();

// Rutas para los pedidos en proceso
router.get('/pedidos/en-proceso', armadorController.getPedidosEnProceso);
router.put('/pedidos/hecho/:id_pedido', armadorController.marcarPedidoHecho);

// Rutas para los pedidos hechos
router.get('/pedidos/hechos', armadorController.getPedidosHechos);
router.put('/pedidos/entregado/:id_pedido', armadorController.marcarPedidoEntregado);

// Ruta para obtener los insumos de un pedido específico
router.get('/pedidos/:id_pedido/insumos', armadorController.getInsumosPorPedido);

module.exports = router;
