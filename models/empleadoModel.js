const db = require('../config/db');

// Obtener todos los empleados
const obtenerEmpleados = (callback) => {
    const query = `
        SELECT 
            u.id_usuario, 
            u.nombre_usuario, 
            u.correo_usuario, 
            u.estado_usuario
        FROM usuarios u
        INNER JOIN rolesusuarios ru ON u.id_usuario = ru.id_usuario
        INNER JOIN roles r ON ru.id_rol = r.id_rol
        WHERE r.nombre_rol = 'empleado' AND r.estado_rol = 1; -- Solo empleados activos
    `;
    db.query(query, callback);
};

// Crear un nuevo empleado
const crearEmpleado = (nuevoEmpleado, callback) => {
    db.getConnection((err, connection) => {
        if (err) return callback(err);

        connection.beginTransaction((err) => {
            if (err) {
                connection.release();
                return callback(err);
            }

            // Insertar en usuarios
            const queryUsuario = `
                INSERT INTO usuarios (nombre_usuario, correo_usuario, clave_usuario, estado_usuario)
                VALUES (?, ?, ?, ?);
            `;
            connection.query(
                queryUsuario,
                [nuevoEmpleado.nombre_usuario, nuevoEmpleado.correo_usuario, nuevoEmpleado.clave_usuario, nuevoEmpleado.estado_usuario],
                (err, resultUsuario) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            callback(err);
                        });
                    }

                    const idUsuario = resultUsuario.insertId;

                    // Asignar el rol de empleado
                    const queryRol = `
                        INSERT INTO rolesusuarios (id_rol, id_usuario)
                        VALUES (
                            (SELECT id_rol FROM roles WHERE nombre_rol = 'empleado'),
                            ?
                        );
                    `;
                    connection.query(queryRol, [idUsuario], (err) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(err);
                            });
                        }

                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    callback(err);
                                });
                            }

                            connection.release();
                            callback(null, idUsuario);
                        });
                    });
                }
            );
        });
    });
};

// Editar un empleado
const editarEmpleado = (id, empleadoActualizado, callback) => {
    const query = `
        UPDATE usuarios
        SET nombre_usuario = ?, correo_usuario = ?, estado_usuario = ?
        WHERE id_usuario = ?;
    `;
    db.query(
        query,
        [empleadoActualizado.nombre_usuario, empleadoActualizado.correo_usuario, empleadoActualizado.estado_usuario, id],
        callback
    );
};

// Deshabilitar un empleado (estado = 0)
const deshabilitarEmpleado = (id, callback) => {
    const query = `
        UPDATE usuarios
        SET estado_usuario = 0
        WHERE id_usuario = ?;
    `;
    db.query(query, [id], callback);
};

// Habilitar/Deshabilitar un empleado (alternar estado)
const alternarEstadoEmpleado = (id, callback) => {
    const query = `
        UPDATE usuarios
        SET estado_usuario = 1 - estado_usuario
        WHERE id_usuario = ?;
    `;
    db.query(query, [id], callback);
};

module.exports = {
    obtenerEmpleados,
    crearEmpleado,
    editarEmpleado,
    deshabilitarEmpleado,
    alternarEstadoEmpleado,
};
