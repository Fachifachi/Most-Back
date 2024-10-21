// models/sucursalModel.js
const db = require('../config/db');

// Función para obtener todas las sucursales
const getSucursales = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM sucursales', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Función para agregar una nueva sucursal
const addSucursal = (id_localidad, nombre_sucursal, cuit, inicio_actividades, ingresos_brutos, domicilio, iva, estado_sucursal) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO sucursales (id_localidad, nombre_sucursal, cuit, inicio_actividades, ingresos_brutos, domicilio, iva, estado_sucursal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
             [id_localidad, nombre_sucursal, cuit, inicio_actividades, ingresos_brutos, domicilio, iva, estado_sucursal], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// Función para actualizar una sucursal
const updateSucursal = (id_sucursal, estado_sucursal) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE sucursales SET estado_sucursal = ? WHERE id_sucursal = ?', 
             [estado_sucursal, id_sucursal], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// Función para eliminar (desactivar) una sucursal
const deleteSucursal = (id_sucursal) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE sucursales SET estado_sucursal = 0 WHERE id_sucursal = ?', 
             [id_sucursal], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

module.exports = {
  getSucursales,
  addSucursal,
  updateSucursal,
  deleteSucursal,
};
