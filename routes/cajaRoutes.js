// routes/cajaRoutes.js
const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/cajaController');

// Rutas para las cajas
router.get('/', cajaController.getCajas);           // Obtener todas las cajas
router.post('/', cajaController.addCaja);           // Agregar una nueva caja
router.put('/:id_caja', cajaController.updateCaja); // Actualizar una caja
router.delete('/:id_caja', cajaController.deleteCaja); // Desactivar una caja

module.exports = router;
