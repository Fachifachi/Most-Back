// controllers/usuarioController.js
const usuarioModel = require('../models/usuarioModel');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Agregar un nuevo usuario
const addUsuario = async (req, res) => {
  const { nombre_usuario, correo_usuario, clave_usuario, estado_usuario } = req.body;
  try {
    const newUsuarioId = await usuarioModel.addUsuario(nombre_usuario, correo_usuario, clave_usuario, estado_usuario);
    res.status(201).json({ id: newUsuarioId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar usuario' });
  }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  const { estado_usuario } = req.body;
  try {
    const affectedRows = await usuarioModel.updateUsuario(id_usuario, estado_usuario);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar (desactivar) un usuario
const deleteUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const affectedRows = await usuarioModel.deleteUsuario(id_usuario);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario desactivado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar usuario' });
  }
};

module.exports = {
  getUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario,
};
