const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/cajaController');

// Rutas
router.get('/', cajaController.getAllCajas); // Ruta para obtener todas las cajas
router.post('/', cajaController.createCaja); // Ruta para agregar una nueva caja
router.put('/:id', cajaController.updateCaja); // Ruta para actualizar una caja
router.put('/:id/toggle', cajaController.toggleStatus); // Ruta para habilitar/deshabilitar una caja

module.exports = router;
