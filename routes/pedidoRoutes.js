const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.createPedido);
router.post('/:id_pedido/agregar-insumos', pedidoController.addInsumosToPedido);
router.get('/', pedidoController.getAllPedidos);

module.exports = router;
