const express = require('express');
const router = express.Router();
const ProvinciaController = require('../controllers/provinciaController');

// Obtener todas las provincias
router.get('/', ProvinciaController.obtenerTodas);

// Editar una provincia
router.put('/:id_provincia', ProvinciaController.editar);

module.exports = router;
