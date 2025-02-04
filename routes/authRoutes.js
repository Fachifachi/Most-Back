// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Asegúrate de tener tu conexión a la base de datos

// Ruta para iniciar sesión
router.post('/', (req, res) => { // Cambiado de '/login' a '/'
    const { username, password } = req.body;

    // Consulta para verificar el usuario
    const sql = 'SELECT * FROM usuarios WHERE nombre_usuario = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en la base de datos' });
        }
        if (results.length === 0) {
            // Usuario no encontrado
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        const user = results[0];

        // Verifica la contraseña
        if (user.clave_usuario !== password) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Si las credenciales son correctas, devuelve el rol y otra información del usuario
        return res.json({ success: true, user: { id: user.id_usuario, role: user.id_rol } });
    });
});

module.exports = router;
