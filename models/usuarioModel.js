// models/usuarioModel.js
const db = require('../config/db');

// Función para obtener todos los usuarios
const getUsuarios = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Función para agregar un nuevo usuario
const addUsuario = (nombre_usuario, correo_usuario, clave_usuario, estado_usuario) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO usuarios (nombre_usuario, correo_usuario, clave_usuario, estado_usuario) VALUES (?, ?, ?, ?)', 
             [nombre_usuario, correo_usuario, clave_usuario, estado_usuario], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.insertId);
    });
  });
};

// Función para actualizar un usuario
const updateUsuario = (id_usuario, estado_usuario) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE usuarios SET estado_usuario = ? WHERE id_usuario = ?', 
             [estado_usuario, id_usuario], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

// Función para eliminar (desactivar) un usuario
const deleteUsuario = (id_usuario) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE usuarios SET estado_usuario = 0 WHERE id_usuario = ?', 
             [id_usuario], 
             (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results.affectedRows);
    });
  });
};

module.exports = {
  getUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario,
};
