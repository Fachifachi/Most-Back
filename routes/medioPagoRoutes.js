// routes/medioPagoRoutes.js
const express = require('express');
const router = express.Router();
const medioPagoController = require('../controllers/medioPagoController');

// Rutas para los medios de pago
router.get('/', medioPagoController.getMediosPago);           // Obtener todos los medios de pago
router.post('/', medioPagoController.addMedioPago);           // Agregar un nuevo medio de pago
router.put('/:id_medio_pago', medioPagoController.updateMedioPago); // Actualizar un medio de pago
router.delete('/:id_medio_pago', medioPagoController.deleteMedioPago); // Desactivar un medio de pago

module.exports = router;
