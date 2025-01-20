const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Obtener todos los administradores
router.get('/admins', usuarioController.getAllAdmins);

// Obtener todos los empleados
router.get('/empleados', usuarioController.getAllEmpleadosForAdmin);

// Crear un nuevo empleado
router.post('/empleados', usuarioController.createEmpleado); // Ruta para crear empleados

// Crear un nuevo administrador
router.post('/admins', usuarioController.createAdmin); // Ruta para crear administradores

// Actualizar un usuario
router.put('/:id_usuario', usuarioController.updateUsuario);

// Cambiar estado de un usuario
router.put('/:id_usuario/toggle', usuarioController.toggleStatus);

// Deshabilitar un usuario
router.put('/:id_usuario/delete', usuarioController.deleteUsuario);

module.exports = router;
