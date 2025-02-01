// routes/turneraRoutes.js
const express = require('express');
const router = express.Router();
const turneraController = require('../controllers/turneraController');

// Obtener pedidos hechos
router.get('/pedidos/hechos', turneraController.getPedidosHechos);

module.exports = router;
