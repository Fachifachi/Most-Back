// models/categoriaModel.js
const db = require('../config/db');

// Obtener todas las categorías
const getAllCategorias = (callback) => {
    db.query('SELECT * FROM categorias', callback);
};

// Crear una nueva categoría
const createCategoria = (categoria, callback) => {
    const { nombre_categoria, descripcion_categoria, estado_categoria } = categoria;
    db.query('INSERT INTO categorias (nombre_categoria, descripcion_categoria, estado_categoria) VALUES (?, ?, ?)', 
        [nombre_categoria, descripcion_categoria, estado_categoria], 
        callback
    );
};

// Actualizar una categoría
const updateCategoria = (id_categoria, categoria, callback) => {
    const { nombre_categoria, descripcion_categoria, estado_categoria } = categoria;
    db.query('UPDATE categorias SET nombre_categoria = ?, descripcion_categoria = ?, estado_categoria = ? WHERE id_categoria = ?', 
        [nombre_categoria, descripcion_categoria, estado_categoria, id_categoria], 
        callback
    );
};

// Deshabilitar una categoría
const deleteCategoria = (id_categoria, callback) => {
    db.query('UPDATE categorias SET estado_categoria = 0 WHERE id_categoria = ?', [id_categoria], callback);
};

module.exports = {
    getAllCategorias,
    createCategoria,
    updateCategoria,
    deleteCategoria,
};
