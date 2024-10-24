const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

// Obtener todos los porcentajes de IVA
const getAllPorcentajesIva = (callback) => {
    db.query('SELECT * FROM porcentajesiva', callback);
};
const createPorcentajeIva = (newPorcentajeIva, callback) => {
  db.query('INSERT INTO porcentajesiva (nombre_porcentaje, descripcion_porcentaje, porcentaje, activo) VALUES (?, ?, ?, ?)', 
  [newPorcentajeIva.nombre_porcentaje, newPorcentajeIva.descripcion_porcentaje, newPorcentajeIva.porcentaje, newPorcentajeIva.activo], 
  callback);
};
// Actualizar un porcentaje de IVA
const updatePorcentajeIva = (id, updatedPorcentajeIva, callback) => {
    db.query('UPDATE porcentajesiva SET ? WHERE id_porcentaje_iva = ?', [updatedPorcentajeIva, id], callback);
};

// Deshabilitar un porcentaje de IVA
const disablePorcentajeIva = (id, callback) => {
    db.query('UPDATE porcentajesiva SET activo = 0 WHERE id_porcentaje_iva = ?', [id], callback);
};

// Habilitar/Deshabilitar un porcentaje de IVA
const toggleStatus = (id, callback) => {
    db.query('UPDATE porcentajesiva SET activo = 1 - activo WHERE id_porcentaje_iva = ?', [id], callback);
};

module.exports = {
    getAllPorcentajesIva,
    createPorcentajeIva,
    updatePorcentajeIva,
    disablePorcentajeIva,
    toggleStatus,
};
