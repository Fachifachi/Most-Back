// routes/insumoRoutes.js
const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumoController');

// Rutas para los insumos
router.get('/', insumoController.getInsumos);           // Obtener todos los insumos
router.post('/', insumoController.addInsumo);           // Agregar un nuevo insumo
router.put('/:id_insumo', insumoController.updateInsumo); // Actualizar un insumo
router.delete('/:id_insumo', insumoController.deleteInsumo); // Desactivar un insumo

module.exports = router;
