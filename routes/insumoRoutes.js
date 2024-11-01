const express = require('express');
const router = express.Router();
const InsumoController = require('../controllers/insumoController');

// Definir las rutas para los insumos
router.get('/', InsumoController.listar);              // Listar todos los insumos
router.post('/', InsumoController.agregar);            // Agregar un nuevo insumo
router.put('/:id', InsumoController.editar);           // Editar un insumo existente
router.patch('/estado', InsumoController.cambiarEstado); // Cambiar estado de un insumo
router.get('/:id', InsumoController.obtenerPorId);     // Obtener un insumo por su ID
router.get('/subcategorias', InsumoController.listarSubcategorias); // Obtener subcategorías
router.get('/tamanios', InsumoController.listarTamanios);           // Obtener tamaños

module.exports = router;
