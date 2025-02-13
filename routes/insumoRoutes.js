// routes/insumoRoutes.js
const express = require('express');
const router = express.Router();
const InsumoController = require('../controllers/insumoController');

// Definir las rutas para los insumos
router.get('/', InsumoController.listar);              // Listar todos los insumos
router.post('/', InsumoController.agregar);            // Agregar un nuevo insumo
router.put('/:id', InsumoController.editar);           // Editar un insumo existente
router.patch('/estado', InsumoController.cambiarEstado); // Cambiar estado de un insumo
router.get('/subcategorias', InsumoController.listarSubcategoriasPorCategoria);
router.get('/tamanios', InsumoController.listarTamanios);
router.get('/categorias', InsumoController.listarCategorias);

// Mover esta ruta al final
router.get('/:id', InsumoController.obtenerPorId);


module.exports = router;
