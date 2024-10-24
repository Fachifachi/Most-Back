// models/porcentajeIvaModel.js
const db = require('../config/db');

// Obtener todos los porcentajes de IVA
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

// Agregar un nuevo porcentaje de IVA
const addPorcentajeIva = (nombre_porcentaje, descripcion_porcentaje, porcentaje) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO porcentajesiva (nombre_porcentaje, descripcion_porcentaje, porcentaje, activo) VALUES (?, ?, ?, 1)', 
      [nombre_porcentaje, descripcion_porcentaje, porcentaje], 
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.insertId);
      }
    );
  });
};

// Actualizar un porcentaje de IVA
const updatePorcentajeIva = (id_porcentaje_iva, updatedFields) => {
  return new Promise((resolve, reject) => {
    const fields = Object.keys(updatedFields);
    const values = fields.map(field => updatedFields[field]);

    const sql = `UPDATE porcentajesiva SET ${fields.map((field, index) => `${field} = ?`).join(', ')} WHERE id_porcentaje_iva = ?`;
    values.push(id_porcentaje_iva);

    db.query(sql, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// Habilitar o deshabilitar un porcentaje de IVA
const togglePorcentajeIva = (id_porcentaje_iva, activo) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE porcentajesiva SET activo = ? WHERE id_porcentaje_iva = ?', 
      [activo, id_porcentaje_iva], 
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.affectedRows);
      }
    );
  });
};

module.exports = {
  getPorcentajesIva,
  addPorcentajeIva,
  updatePorcentajeIva,
  togglePorcentajeIva,
};
