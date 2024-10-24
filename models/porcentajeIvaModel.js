const db = require('../config/db');

// Obtener todos los porcentajes de IVA
const getAllPorcentajesIva = (callback) => {
    db.query('SELECT * FROM porcentajesiva', callback);
};

// Crear un nuevo porcentaje de IVA
const createPorcentajeIva = (porcentajeIva, callback) => {
    const { nombre_porcentaje, descripcion_porcentaje, porcentaje } = porcentajeIva;
    db.query(
        'INSERT INTO porcentajesiva (nombre_porcentaje, descripcion_porcentaje, porcentaje, activo) VALUES (?, ?, ?, 1)', // Fijamos activo como 1 por defecto
        [nombre_porcentaje, descripcion_porcentaje, porcentaje],
        callback
    );
};

// Actualizar un porcentaje de IVA
const updatePorcentajeIva = (id_porcentaje_iva, porcentajeIva, callback) => {
    const { nombre_porcentaje, descripcion_porcentaje, porcentaje, activo } = porcentajeIva;
    db.query(
        'UPDATE porcentajesiva SET nombre_porcentaje = ?, descripcion_porcentaje = ?, porcentaje = ?, activo = ? WHERE id_porcentaje_iva = ?',
        [nombre_porcentaje, descripcion_porcentaje, porcentaje, activo, id_porcentaje_iva],
        callback
    );
};

// Deshabilitar un porcentaje de IVA (establecer activo en 0)
const disablePorcentajeIva = (id_porcentaje_iva, callback) => {
    db.query('UPDATE porcentajesiva SET activo = 0 WHERE id_porcentaje_iva = ?', [id_porcentaje_iva], callback);
};

// Habilitar/Deshabilitar un porcentaje de IVA (toggle)
const toggleStatus = (id_porcentaje_iva, callback) => {
    db.query('UPDATE porcentajesiva SET activo = 1 - activo WHERE id_porcentaje_iva = ?', [id_porcentaje_iva], callback);
};

module.exports = {
    getAllPorcentajesIva,
    createPorcentajeIva,
    updatePorcentajeIva,
    disablePorcentajeIva,
    toggleStatus
};
