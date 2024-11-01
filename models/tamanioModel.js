// models/tamanioModel.js
const db = require('../config/db');

// Función para obtener todos los tamaños
const getTamanios = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM tamanios', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Función para agregar un nuevo tamaño
const addTamanio = (nombre_tamanio, estado_tamanio) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO tamanios (nombre_tamanio, estado_tamanio) VALUES (?, )', [nombre_tamanio, estado_tamanio], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// Función para actualizar un tamaño, incluyendo el nombre
const updateTamanio = (id_tamanio, nombre_tamanio, estado_tamanio) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE tamanios SET nombre_tamanio = ?, estado_tamanio = ? WHERE id_tamanio = ?',
      [nombre_tamanio, estado_tamanio, id_tamanio],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.affectedRows);
      }
    );
  });
};

// F (desactivar) un tamaño
const deleteTamanio = (id_tamanio) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE tamanios SET estado_tamanio = 0 WHERE id_tamanio = ?', [id_tamanio], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};
const getTamaniosById = (id_tamanio) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM tamanios WHERE id_tamanio = ?', [id_tamanio], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]); // Devuelve el primer resultado
    });
  });
};
module.exports = {
  getTamanios,
  addTamanio,
  updateTamanio,
  deleteTamanio,
  getTamaniosById // Asegúrate de incluir esto
};