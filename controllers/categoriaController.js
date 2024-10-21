// controllers/categoriaController.js
const categoriaModel = require('../models/categoriaModel');

// Obtener todas las categorías
exports.getAllCategorias = (req, res) => {
    categoriaModel.getAllCategorias((err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};

// Crear una nueva categoría
exports.createCategoria = (req, res) => {
    const newCategoria = req.body;
    categoriaModel.createCategoria(newCategoria, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id_categoria: results.insertId, ...newCategoria });
    });
};

// Actualizar una categoría
exports.updateCategoria = (req, res) => {
    const { id_categoria } = req.params;
    const updatedCategoria = req.body;

    categoriaModel.updateCategoria(id_categoria, updatedCategoria, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría actualizada' });
    });
};

// Deshabilitar una categoría
exports.deleteCategoria = (req, res) => {
    const { id_categoria } = req.params;

    categoriaModel.deleteCategoria(id_categoria, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría deshabilitada' });
    });
};
