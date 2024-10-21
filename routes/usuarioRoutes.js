// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para los usuarios
router.get('/', usuarioController.getUsuarios);           // Obtener todos los usuarios
router.post('/', usuarioController.addUsuario);           // Agregar un nuevo usuario
router.put('/:id_usuario', usuarioController.updateUsuario); // Actualizar un usuario
router.delete('/:id_usuario', usuarioController.deleteUsuario); // Desactivar un usuario

module.exports = router;
