// routes/subcategoriaRoutes.js
const express = require('express');
const router = express.Router();
const subcategoriaController = require('../controllers/subcategoriaController');

// Rutas para las subcategorías
router.get('/', subcategoriaController.getSubcategorias);           // Obtener todas las subcategorías
router.post('/', subcategoriaController.addSubcategoria);           // Agregar una nueva subcategoría
router.put('/:id_sub_categoria', subcategoriaController.updateSubcategoria); // Actualizar una subcategoría
router.delete('/:id_sub_categoria', subcategoriaController.deleteSubcategoria); // Desactivar una subcategoría

module.exports = router;
