const express = require('express');
const router = express.Router();
const SucursalController = require('../controllers/sucursalController');

// Endpoint para obtener la sucursal (GET /api/sucursales)
router.get('/', SucursalController.obtener);

// Endpoint para editar la sucursal (PUT /api/sucursales/:id)
router.put('/:id_sucursal', SucursalController.editar);

// Endpoint para obtener todas las provincias (GET /api/provincias)
router.get('/provincias', SucursalController.obtenerProvincias);

// Endpoint para obtener localidades por provincia (GET /api/localidades/provincia/:idProvincia)
router.get('/localidades/provincia/:idProvincia', SucursalController.obtenerLocalidadesPorProvincia);

module.exports = router;
