const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/', categoriaController.getAllCategorias);
router.post('/', categoriaController.createCategoria); // Ruta para agregar categorías
router.put('/:id_categoria', categoriaController.updateCategoria);
router.put('/:id_categoria/toggle', categoriaController.toggleStatus); // Ruta para habilitar/deshabilitar
router.delete('/:id_categoria', categoriaController.deleteCategoria);

module.exports = router;
