// routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Definición de las rutas
router.get('/', categoriaController.getAllCategorias);
router.post('/', categoriaController.createCategoria);
router.put('/:id_categoria', categoriaController.updateCategoria);
router.delete('/:id_categoria', categoriaController.deleteCategoria);

module.exports = router;
