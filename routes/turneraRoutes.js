const express = require('express');
const router = express.Router();
const armadorController = require('../controllers/armadorController'); // Usar el controlador del armador

// Obtener pedidos hechos para la Turnera
router.get('/pedidos/hechos', armadorController.getPedidosHechos);

module.exports = router;
