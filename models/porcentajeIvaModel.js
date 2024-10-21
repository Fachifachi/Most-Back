// models/porcentajeIvaModel.js
const db = require('../config/db');

// Función para obtener todos los porcentajes de IVA
const getPorcentajesIva = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM porcentajesiva', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Función para agregar un nuevo porcentaje de IVA
const addPorcentajeIva = (nombre_porcentaje, descripcion_porcentaje) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO porcentajesiva (nombre_porcentaje, descripcion_porcentaje) VALUES (?, ?)', 
             [nombre_porcentaje, descripcion_porcentaje], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// Función para actualizar un porcentaje de IVA
const updatePorcentajeIva = (id_porcentaje_iva, nombre_porcentaje) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE porcentajesiva SET nombre_porcentaje = ? WHERE id_porcentaje_iva = ?', 
             [nombre_porcentaje, id_porcentaje_iva], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// Función para eliminar (desactivar) un porcentaje de IVA
const deletePorcentajeIva = (id_porcentaje_iva) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM porcentajesiva WHERE id_porcentaje_iva = ?', 
             [id_porcentaje_iva], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

module.exports = {
  getPorcentajesIva,
  addPorcentajeIva,
  updatePorcentajeIva,
  deletePorcentajeIva,
};
