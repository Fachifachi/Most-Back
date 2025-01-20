const usuarioModel = require('../models/usuarioModel');

// Obtener todos los administradores
exports.getAllAdmins = (req, res) => {
    usuarioModel.getAllAdmins((err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};

// Obtener todos los empleados
exports.getAllEmpleadosForAdmin = (req, res) => {
    usuarioModel.getAllEmpleados((err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};

// Crear un nuevo empleado
exports.createEmpleado = (req, res) => {
  const { nombre_usuario, correo_usuario, clave_usuario } = req.body;
  
  if (!nombre_usuario || !correo_usuario || !clave_usuario) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const nuevoEmpleado = { nombre_usuario, correo_usuario, clave_usuario };
  
  usuarioModel.createEmpleado(nuevoEmpleado, (err, results) => {
      if (err) {
          return res.status(500).json({ message: err.message });
      }
      res.status(201).json({ id_usuario: results.insertId, ...nuevoEmpleado });
  });
};

// Crear un nuevo administrador
exports.createAdmin = (req, res) => {
  const { nombre_usuario, correo_usuario, clave_usuario } = req.body;

  if (!nombre_usuario || !correo_usuario || !clave_usuario) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const nuevoAdmin = { nombre_usuario, correo_usuario, clave_usuario };
  
  usuarioModel.createAdmin(nuevoAdmin, (err, results) => {
      if (err) {
          return res.status(500).json({ message: err.message });
      }
      res.status(201).json({ id_usuario: results.insertId, ...nuevoAdmin });
  });
};

// Actualizar un usuario
exports.updateUsuario = (req, res) => {
    const { id_usuario } = req.params;
    const updatedUsuario = req.body;

    usuarioModel.updateUsuario(id_usuario, updatedUsuario, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado' });
    });
};

// Deshabilitar un usuario
exports.deleteUsuario = (req, res) => {
    const { id_usuario } = req.params;

    usuarioModel.deleteUsuario(id_usuario, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario deshabilitado' });
    });
};

// Cambiar estado de un usuario
exports.toggleStatus = (req, res) => {
    const { id_usuario } = req.params;

    usuarioModel.toggleStatus(id_usuario, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Estado de usuario cambiado' });
    });
};
