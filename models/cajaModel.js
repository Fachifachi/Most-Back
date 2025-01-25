const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

// Obtener todas las cajas
const getAllCajas = (callback) => {
    db.query('SELECT * FROM cajas', callback);
};

// Crear una nueva caja
const createCaja = (newCaja, callback) => {
    db.query('INSERT INTO cajas (numero_caja, estado_caja) VALUES (?, ?)', 
    [newCaja.numero_caja, newCaja.estado_caja], 
    callback);
};

// Actualizar una caja
const updateCaja = (id, updatedCaja, callback) => {
    db.query('UPDATE cajas SET ? WHERE id_caja = ?', [updatedCaja, id], callback);
};

// Cambiar el estado de una caja (habilitar/deshabilitar)
const toggleStatus = (id, callback) => {
    db.query('UPDATE cajas SET estado_caja = 1 - estado_caja WHERE id_caja = ?', [id], callback);
};

module.exports = {
    getAllCajas,
    createCaja,
    updateCaja,
    toggleStatus,
};
