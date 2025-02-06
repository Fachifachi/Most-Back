const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Crear un nuevo ticket
router.post('/', ticketController.createTicket);

// Obtener un ticket por ID
router.get('/:id_ticket', ticketController.getTicketById);

module.exports = router;
