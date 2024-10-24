const express = require('express');
const router = express.Router();
const porcentajeIvaController = require('../controllers/porcentajeIvaController');

// Rutas
router.get('/', porcentajeIvaController.getAllPorcentajesIva);
router.post('/', porcentajeIvaController.createPorcentajeIva); // Ruta para agregar porcentajes de IVA
router.put('/:id', porcentajeIvaController.updatePorcentajeIva); // Ruta para actualizar porcentajes de IVA
router.delete('/:id', porcentajeIvaController.disablePorcentajeIva); // Ruta para deshabilitar un porcentaje de IVA
router.put('/:id/toggle', porcentajeIvaController.toggleStatus); // Ruta para habilitar/deshabilitar

module.exports = router;
