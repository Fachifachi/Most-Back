const express = require('express');
const router = express.Router();
const cajaController = require('../controllers/cajaController');
const { verifyToken } = require('../middleware/authMiddleware');
const db = require('../config/db');

// Ruta para obtener todas las cajas
router.get('/', cajaController.getAllCajas);

// Ruta para obtener cajas disponibles (estado_caja = 1)
// Ruta para obtener cajas disponibles (estado_caja = 1)
// Ruta para obtener cajas disponibles (estado_caja = 1)
router.get('/disponibles', verifyToken, (req, res) => {
    const idUsuario = req.user.id; // ID del usuario autenticado
    const sql = `
        SELECT * FROM cajas 
        WHERE estado_caja = 1 
        AND id_caja NOT IN (
            SELECT id_caja FROM turnoscaja 
            WHERE fin_turno IS NULL 
            AND id_usuario = ?
        )
    `;

    db.query(sql, [idUsuario], (err, results) => {
        if (err) {
            console.error("Error al obtener cajas disponibles:", err);
            return res.status(500).json({ message: 'Error al obtener las cajas disponibles' });
        }
        res.json(results);
    });
});


// Ruta para agregar una nueva caja
router.post('/', cajaController.createCaja);

// Ruta para actualizar una caja
router.put('/:id', cajaController.updateCaja);

// Ruta para habilitar/deshabilitar una caja
router.put('/:id/toggle', cajaController.toggleStatus);

// Ruta para abrir una caja (requiere autenticación)
// Ruta para abrir una caja (requiere autenticación)
// Ruta para abrir una caja (requiere autenticación)
// Ruta para abrir una caja (requiere autenticación)
router.post('/abrir', verifyToken, (req, res) => {
    const { idCaja, apertura_caja } = req.body; // Get apertura_caja from request body
    const idUsuario = req.user.id;

    // Verifica si el usuario ya tiene un turno de caja activo
    const checkTurnoSql = 'SELECT * FROM turnoscaja WHERE id_usuario = ? AND fin_turno IS NULL';
    db.query(checkTurnoSql, [idUsuario], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar el turno de caja' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Ya tienes un turno de caja activo' });
        }

        // Abre la caja (registra el turno en la tabla turnoscaja)
        const sql = 'INSERT INTO turnoscaja (id_usuario, id_caja, inicio_turno, apertura_caja) VALUES (?, ?, NOW(), ?)';
        db.query(sql, [idUsuario, idCaja, apertura_caja], (err, result) => { // Use apertura_caja value
            if (err) {
                console.error("Error al abrir la caja:", err);
                return res.status(500).json({ message: 'Error al abrir la caja' });
            }
            const idTurnoCaja = result.insertId;
            return res.json({ success: true, message: 'Caja abierta con éxito', idTurnoCaja: idTurnoCaja });
        });
    });
});

// Ruta para cerrar una caja (requiere autenticación)
router.post('/cerrar', verifyToken, (req, res) => {
    const { cierre_caja } = req.body;  // Get cierre_caja from request body
    const idUsuario = req.user.id;

    // Cierra la caja (actualiza la tabla turnoscaja)
    const sql = 'UPDATE turnoscaja SET fin_turno = NOW(), cierre_caja = ? WHERE id_usuario = ? AND fin_turno IS NULL';
    db.query(sql, [cierre_caja, idUsuario], (err, result) => {  // Use cierre_caja value
        if (err) {
            console.error("Error al cerrar la caja:", err);
            return res.status(500).json({ message: 'Error al cerrar la caja' });
        }
        return res.json({ success: true, message: 'Caja cerrada con éxito' });
    });
});


module.exports = router;
