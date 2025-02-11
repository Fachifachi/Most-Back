const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

// Obtener todos los porcentajes de impuestos
const getAllPorcentajesImpuestos = (callback) => {
    db.query('SELECT * FROM porcentajesimpuestos', callback);
};

const createPorcentajeImpuestos = (newPorcentajeImpuestos, callback) => {
  db.query('INSERT INTO porcentajesimpuestos (nombre_porcentaje, descripcion_porcentaje, porcentaje, activo) VALUES (?, ?, ?, ?)', 
  [newPorcentajeImpuestos.nombre_porcentaje, newPorcentajeImpuestos.descripcion_porcentaje, newPorcentajeImpuestos.porcentajesimpuestos, newPorcentajeImpuestos.activo], 
  callback);
};

// Actualizar un porcentaje de impuestos
const updatePorcentajeImpuestos = (id, updatedPorcentajeImpuestos, callback) => {
    db.query('UPDATE porcentajesimpuestos SET ? WHERE id_porcentaje = ?', [updatedPorcentajeImpuestos, id], callback);
};

// Deshabilitar un porcentaje de impuestos
const disablePorcentajeImpuestos = (id, callback) => {
    db.query('UPDATE porcentajesimpuestos SET activo = 0 WHERE id_porcentaje = ?', [id], callback);
};

// Habilitar/Deshabilitar un porcentaje de impuestos
const toggleStatus = (id, callback) => {
    db.query('UPDATE porcentajesimpuestos SET activo = 1 - activo WHERE id_porcentaje = ?', [id], callback);
};

const getFilteredPorcentajesImpuestos = (filtros, callback) => {
    let query = 'SELECT * FROM porcentajesimpuestos WHERE 1=1';
    const values = [];

    if (filtros.nombre_porcentaje) {
        query += ' AND nombre_porcentaje LIKE ?';
        values.push(`%${filtros.nombre_porcentaje}%`);
    }

    if (filtros.activo !== null) { // Revisa si activo es diferente de null
        query += ' AND activo = ?';
        values.push(filtros.activo);
    }

    console.log("Consulta ejecutada:", query); // Verifica la consulta en consola
    console.log("Valores de la consulta:", values);

    db.query(query, values, callback);
};

module.exports = {
    getAllPorcentajesImpuestos,
    createPorcentajeImpuestos,
    updatePorcentajeImpuestos,
    disablePorcentajeImpuestos,
    toggleStatus,
    getFilteredPorcentajesImpuestos, // Nueva función de filtrado
};
