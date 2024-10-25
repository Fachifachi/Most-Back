const express = require('express');
const router = express.Router();
const SubcategoriaController = require('../controllers/subcategoriaController');


// Ruta para listar subcategorías
router.get('/', SubcategoriaController.listar);

// Ruta para obtener una subcategoría por ID
router.get('/:id', SubcategoriaController.obtenerPorId);

// Ruta para agregar una nueva subcategoría
router.post('/', SubcategoriaController.agregar);

// Ruta para editar una subcategoría
router.put('/:id', SubcategoriaController.editar);

// Ruta para cambiar el estado de una subcategoría
router.patch('/estado', SubcategoriaController.cambiarEstado);

module.exports = router;
