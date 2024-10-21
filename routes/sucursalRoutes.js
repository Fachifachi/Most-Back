// routes/sucursalRoutes.js
const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

// Rutas para las sucursales
router.get('/', sucursalController.getSucursales);           // Obtener todas las sucursales
router.post('/', sucursalController.addSucursal);           // Agregar una nueva sucursal
router.put('/:id_sucursal', sucursalController.updateSucursal); // Actualizar una sucursal
router.delete('/:id_sucursal', sucursalController.deleteSucursal); // Desactivar una sucursal

module.exports = router;
