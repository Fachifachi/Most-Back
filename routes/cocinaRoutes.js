// routes/cocinaRoutes.js
const express = require('express');
const router = express.Router();
const cocinaController = require('../controllers/cocinaController');

// Obtener insumos de comida pendientes
router.get('/insumos', cocinaController.getInsumosComidaPendientes);

// Marcar insumo como hecho
router.put('/insumos/:id_pedido/:id_insumo', cocinaController.marcarInsumoHecho);

module.exports = router;
