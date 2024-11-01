// routes/tamanioRoutes.js
const express = require('express');
const router = express.Router();
const tamanioController = require('../controllers/tamanioController');

// Rutas para los tamaños
router.get('/', tamanioController.getTamanios);               // Obtener todos los tamaños
router.post('/', tamanioController.addTamanio);               // Agregar un nuevo tamaño
router.put('/:id_tamanio', tamanioController.updateTamanio);  // Actualizar un tamaño (nombre y estado)
router.put('/:id_tamanio/toggle', tamanioController.toggleTamanio); // Cambia el estado de un tamaño



module.exports = router;
