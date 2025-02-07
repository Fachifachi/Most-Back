const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE nombre_usuario = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la base de datos' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        const user = results[0];

        // Aquí se debe implementar la comparación segura de contraseñas
        if (user.clave_usuario !== password) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Antes de generar el token, cierra cualquier sesión activa
        const closeSessionSql = 'UPDATE turnoscaja SET fin_turno = NOW() WHERE id_usuario = ? AND fin_turno IS NULL';
        db.query(closeSessionSql, [user.id_usuario], (err, results) => {
            if (err) {
                console.error("Error al cerrar sesión activa:", err);
                return res.status(500).json({ success: false, message: 'Error al cerrar sesión activa' });
            }

            // Generar el JWT
            const token = jwt.sign({ id: user.id_usuario, role: user.id_rol }, 'tu_secreto_super_secreto', {
                expiresIn: '1h'
            });

            // Si las credenciales son correctas, devuelve el token y la información del usuario
            return res.json({
                success: true,
                token: token,
                user: { id: user.id_usuario, role: user.id_rol }
            });
        });
    });
});

module.exports = router;
