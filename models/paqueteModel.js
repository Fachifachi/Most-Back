// models/paqueteModel.js
const db = require('../config/db');

// Función para obtener todos los paquetes
const getPaquetes = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM paquetes', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Función para agregar un nuevo paquete
const addPaquete = (nombre_paquete, estado_paquete) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO paquetes (nombre_paquete, estado_paquete) VALUES (?, ?)', [nombre_paquete, estado_paquete], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// Función para actualizar un paquete
const updatePaquete = (id_paquete, estado_paquete) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE paquetes SET estado_paquete = ? WHERE id_paquete = ?', [estado_paquete, id_paquete], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// Función para eliminar (desactivar) un paquete
const deletePaquete = (id_paquete) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE paquetes SET estado_paquete = 0 WHERE id_paquete = ?', [id_paquete], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

module.exports = {
  getPaquetes,
  addPaquete,
  updatePaquete,
  deletePaquete,
};
