// models/subcategoriaModel.js
const db = require('../config/db');

// Función para obtener todas las subcategorías
const getSubcategorias = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        subcategorias.*, 
        categorias.nombre_categoria 
      FROM subcategorias
      INNER JOIN categorias 
      ON subcategorias.id_categoria = categorias.id_categoria
    `;

    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
// Función para agregar una nueva subcategoría
const addSubcategoria = (nombre_sub_categoria, descripcion_sub_categoria, id_procentaje_iva, estado_sub_categoria) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO subcategorias (nombre_sub_categoria, descripcion_sub_categoria, id_procentaje_iva, estado_sub_categoria) VALUES (?, ?, ?, ?)', 
             [nombre_sub_categoria, descripcion_sub_categoria, id_procentaje_iva, estado_sub_categoria], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// Función para actualizar una subcategoría
const updateSubcategoria = (id_sub_categoria, estado_sub_categoria) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE subcategorias SET estado_sub_categoria = ? WHERE id_sub_categoria = ?', 
             [estado_sub_categoria, id_sub_categoria], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// Función para eliminar (desactivar) una subcategoría
const deleteSubcategoria = (id_sub_categoria) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE subcategorias SET estado_sub_categoria = 0 WHERE id_sub_categoria = ?', 
             [id_sub_categoria], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

module.exports = {
  getSubcategorias,
  addSubcategoria,
  updateSubcategoria,
  deleteSubcategoria,
};
