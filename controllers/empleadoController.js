// controllers/empleadoController.js
const empleadoModel = require('../models/empleadoModel'); // Asegúrate de que la ruta sea correcta

// Obtener todos los empleados
exports.getAllEmpleados = (req, res) => {
    empleadoModel.obtenerEmpleados((err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};

// Crear un nuevo empleado
exports.createEmpleado = (req, res) => {
    const nuevoEmpleado = req.body;

    // Verificar si el rol es 'empleado' antes de crear el usuario
    if (nuevoEmpleado.id_rol !== 3) { // Asumiendo que 3 es el ID del rol de 'empleado'
        return res.status(403).json({ message: 'Solo se pueden agregar usuarios con rol de empleado.' });
    }

    empleadoModel.crearEmpleado(nuevoEmpleado, (err, idUsuario) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id_usuario: idUsuario, ...nuevoEmpleado });
    });
};

// Editar un empleado
exports.updateEmpleado = (req, res) => {
    const { id } = req.params;
    const empleadoActualizado = req.body;

    empleadoModel.editarEmpleado(id, empleadoActualizado, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado actualizado' });
    });
};

// Deshabilitar un empleado
exports.deleteEmpleado = (req, res) => {
    const { id } = req.params;

    empleadoModel.deshabilitarEmpleado(id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json({ message: 'Empleado deshabilitado' });
    });
};

// Cambiar estado de un empleado
exports.toggleStatus = (req, res) => {
    const { id } = req.params;

    empleadoModel.alternarEstadoEmpleado(id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.json({ message: 'Estado de empleado cambiado' });
    });
};
