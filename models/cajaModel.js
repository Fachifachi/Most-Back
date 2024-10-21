// models/cajaModel.js
const db = require('../config/db');

// Función para obtener todas las cajas
const getCajas = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM cajas', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Función para agregar una nueva caja
const addCaja = (numero_caja, estado_caja) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO cajas (numero_caja, estado_caja) VALUES (?, ?)', [numero_caja, estado_caja], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// Función para actualizar el estado de una caja
const updateCaja = (id_caja, estado_caja) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE cajas SET estado_caja = ? WHERE id_caja = ?', [estado_caja, id_caja], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// Función para eliminar (desactivar) una caja
const deleteCaja = (id_caja) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE cajas SET estado_caja = 0 WHERE id_caja = ?', [id_caja], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

module.exports = {
  getCajas,
  addCaja,
  updateCaja,
  deleteCaja,
};
