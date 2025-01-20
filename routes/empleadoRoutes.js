// routes/empleadoRoutes.js
const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

// Obtener todos los empleados
router.get('/', empleadoController.getAllEmpleados);

// Crear un nuevo empleado
router.post('/', empleadoController.createEmpleado);

// Editar un empleado
router.put('/:id', empleadoController.updateEmpleado);

// Deshabilitar un empleado
router.delete('/:id', empleadoController.deleteEmpleado);

// Cambiar estado de un empleado
router.patch('/:id/status', empleadoController.toggleStatus);

module.exports = router;
