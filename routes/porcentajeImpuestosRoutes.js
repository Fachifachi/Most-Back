const express = require('express');
const router = express.Router();
const porcentajeImpuestosController = require('../controllers/porcentajeImpuestosController');

// Rutas
router.get('/', porcentajeImpuestosController.getAllPorcentajesImpuestos); // Ruta para obtener todos los porcentajes 
router.post('/', porcentajeImpuestosController.createPorcentajeImpuestos); // Ruta para agregar porcentajes 
router.put('/:id', porcentajeImpuestosController.updatePorcentajeImpuestos); // Ruta para actualizar porcentajes 
router.delete('/:id', porcentajeImpuestosController.disablePorcentajeImpuestos); // Ruta para deshabilitar un porcentaje 
router.put('/:id/toggle', porcentajeImpuestosController.toggleStatus); // Ruta para habilitar/deshabilitar

// Nueva ruta específica para obtener porcentajes 
router.get('/filtrar', porcentajeImpuestosController.getFilteredPorcentajesImpuestos);

module.exports = router;
