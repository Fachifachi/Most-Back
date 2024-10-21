// routes/porcentajeIvaRoutes.js
const express = require('express');
const router = express.Router();
const porcentajeIvaController = require('../controllers/porcentajeIvaController');

// Rutas para los porcentajes de IVA
router.get('/', porcentajeIvaController.getPorcentajesIva);           // Obtener todos los porcentajes de IVA
router.post('/', porcentajeIvaController.addPorcentajeIva);           // Agregar un nuevo porcentaje de IVA
router.put('/:id_porcentaje_iva', porcentajeIvaController.updatePorcentajeIva); // Actualizar un porcentaje de IVA
router.delete('/:id_porcentaje_iva', porcentajeIvaController.deletePorcentajeIva); // Eliminar un porcentaje de IVA

module.exports = router;
