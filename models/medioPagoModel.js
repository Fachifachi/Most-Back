// models/medioPagoModel.js
const db = require('../config/db');

// Función para obtener todos los medios de pago
const getMediosPago = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM medios_pago', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Función para agregar un nuevo medio de pago
const addMedioPago = (nombre_medio_pago, descripcion_medio_pago) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO medios_pago (nombre_medio_pago, descripcion_medio_pago) VALUES (?, ?)', 
             [nombre_medio_pago, descripcion_medio_pago], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// Función para actualizar un medio de pago
const updateMedioPago = (id_medio_pago, nombre_medio_pago, descripcion_medio_pago) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE medios_pago SET nombre_medio_pago = ?, descripcion_medio_pago = ? WHERE id_medio_pago = ?', 
             [nombre_medio_pago, descripcion_medio_pago, id_medio_pago], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// Función para eliminar (desactivar) un medio de pago
const deleteMedioPago = (id_medio_pago) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE medios_pago SET estado = 0 WHERE id_medio_pago = ?', 
             [id_medio_pago], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

module.exports = {
  getMediosPago,
  addMedioPago,
  updateMedioPago,
  deleteMedioPago,
};
