// models/insumoModel.js
const db = require('../config/db');

// Función para obtener todos los insumos
const getInsumos = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM insumos', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Función para agregar un nuevo insumo
const addInsumo = (id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, estado_insumo, precio_insumo) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO insumos (id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, estado_insumo, precio_insumo) VALUES (?, ?, ?, ?, ?, ?, ?)', 
             [id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, estado_insumo, precio_insumo], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// Función para actualizar un insumo
const updateInsumo = (id_insumo, id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, estado_insumo, precio_insumo) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE insumos SET id_sub_categoria = ?, id_tamanio = ?, nombre_insumo = ?, descripcion_insumo = ?, stock_insumo = ?, estado_insumo = ?, precio_insumo = ? WHERE id_insumo = ?', 
             [id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, estado_insumo, precio_insumo, id_insumo], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// Función para eliminar (desactivar) un insumo
const deleteInsumo = (id_insumo) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE insumos SET estado_insumo = 0 WHERE id_insumo = ?', 
             [id_insumo], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

module.exports = {
  getInsumos,
  addInsumo,
  updateInsumo,
  deleteInsumo,
};
