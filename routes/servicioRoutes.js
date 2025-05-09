const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioControllers.js');
const upload = require('../middlewares/upload');

// Rutas para servicios
// GET - Listar todos los servicios
router.get('/', servicioController.listar);

// GET - Formulario para crear nuevo servicio
router.get('/crear', servicioController.formCrear);

// POST - Crear nuevo servicio
router.post('/crear', upload.single('imgReferencia'), servicioController.crear);

// GET - Formulario para editar servicio
router.get('/editar/:id', servicioController.formEditar);

// POST - Actualizar servicio
router.post('/editar/:id', upload.single('imgReferencia'), servicioController.actualizar);

// GET - Eliminar servicio (confirmación se hace con JavaScript en el cliente)
router.get('/eliminar/:id', servicioController.eliminar);

// GET - Mostrar detalles de un servicio
router.get('/:id', servicioController.detalles);

module.exports = router;