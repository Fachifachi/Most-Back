const express = require('express');
const router = express.Router();
const porcentajeIvaController = require('../controllers/porcentajeIvaController');

router.get('/', porcentajeIvaController.getAllPorcentajesIva);
router.post('/', porcentajeIvaController.createPorcentajeIva);
router.put('/:id', porcentajeIvaController.updatePorcentajeIva);
router.put('/disable/:id', porcentajeIvaController.disablePorcentajeIva);
router.put('/toggle/:id', porcentajeIvaController.toggleStatus);

module.exports = router;
