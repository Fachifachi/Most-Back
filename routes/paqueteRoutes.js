// routes/paqueteRoutes.js
const express = require('express');
const router = express.Router();
const paqueteController = require('../controllers/paqueteController');

// Rutas para los paquetes
router.get('/', paqueteController.getPaquetes);           // Obtener todos los paquetes
router.post('/', paqueteController.addPaquete);           // Agregar un nuevo paquete
router.put('/:id_paquete', paqueteController.updatePaquete); // Actualizar un paquete
router.delete('/:id_paquete', paqueteController.deletePaquete); // Desactivar un paquete

module.exports = router;
