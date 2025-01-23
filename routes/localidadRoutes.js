const express = require('express');
const router = express.Router();
const LocalidadController = require('../controllers/localidadController');

// Obtener todas las localidades
router.get('/', LocalidadController.obtenerTodas);

// Obtener localidades por provincia
router.get('/provincia/:idProvincia', LocalidadController.obtenerPorProvincia);

// Editar una localidad
router.put('/:id_localidad', LocalidadController.editar);

module.exports = router;
