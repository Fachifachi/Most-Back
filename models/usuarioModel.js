const db = require('../config/db');

// Obtener todos los administradores
const getAllAdmins = (callback) => {
    db.query('SELECT * FROM usuarios WHERE id_rol = 2', callback);
};

// Obtener todos los empleados
const getAllEmpleados = (callback) => {
    db.query('SELECT * FROM usuarios WHERE id_rol = 3', callback);
};

// Crear un nuevo empleado
const createEmpleado = (empleado, callback) => {
    const { nombre_usuario, correo_usuario, clave_usuario } = empleado;
    db.query(
        'INSERT INTO usuarios (nombre_usuario, correo_usuario, clave_usuario, estado_usuario, id_rol) VALUES (?, ?, ?, 1, 3)', // id_rol = 3 para empleados
        [nombre_usuario, correo_usuario, clave_usuario],
        callback
    );
};

// Crear un nuevo administrador
const createAdmin = (admin, callback) => {
    const { nombre_usuario, correo_usuario, clave_usuario } = admin;
    db.query(
        'INSERT INTO usuarios (nombre_usuario, correo_usuario, clave_usuario, estado_usuario, id_rol) VALUES (?, ?, ?, 1, 2)', // id_rol = 2 para administradores
        [nombre_usuario, correo_usuario, clave_usuario],
        callback
    );
};

// Actualizar un usuario
const updateUsuario = (id_usuario, usuario, callback) => {
    const { nombre_usuario, correo_usuario, clave_usuario, estado_usuario } = usuario;
    db.query(
        'UPDATE usuarios SET nombre_usuario = ?, correo_usuario = ?, clave_usuario = ?, estado_usuario = ? WHERE id_usuario = ?',
        [nombre_usuario, correo_usuario, clave_usuario, estado_usuario, id_usuario],
        callback
    );
};

// Deshabilitar un usuario
const deleteUsuario = (id_usuario, callback) => {
    db.query('UPDATE usuarios SET estado_usuario = 0 WHERE id_usuario = ?', [id_usuario], callback);
};

// Cambiar estado de un usuario (Habilitar/Deshabilitar)
const toggleStatus = (id_usuario, callback) => {
    db.query('UPDATE usuarios SET estado_usuario = 1 - estado_usuario WHERE id_usuario = ?', [id_usuario], callback);
};

module.exports = {
    getAllAdmins,
    getAllEmpleados,
    createEmpleado,
    createAdmin,
    updateUsuario,
    deleteUsuario,
    toggleStatus,
};
