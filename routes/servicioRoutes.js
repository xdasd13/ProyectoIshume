const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// Configuración de multer para subida de imágenes
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: Solo se permiten imágenes (jpg, jpeg, png, gif)"));
  }
});

// Controlador temporal (si aún no tienes un controlador separado)
const servicioController = {
  listar: (req, res) => {
    // Simulando datos de servicios
    const servicios = [
      { id: 1, nombre: 'Sesión Fotográfica', descripcion: 'Sesión fotográfica profesional', precio: 1500 },
      { id: 2, nombre: 'Book Familiar', descripcion: 'Fotografías para toda la familia', precio: 2000 },
      { id: 3, nombre: 'Evento Corporativo', descripcion: 'Cobertura de eventos empresariales', precio: 3500 }
    ];
    
    res.render('servicios/listar', { 
      titulo: 'Catálogo de Servicios',
      servicios
    });
  },
  
  formCrear: (req, res) => {
    res.render('servicios/form', { 
      titulo: 'Crear Servicio',
      servicio: {},
      esEdicion: false
    });
  },
  
  crear: (req, res) => {
    // Aquí iría la lógica para guardar en la base de datos
    req.flash('mensaje', {
      tipo: 'success',
      texto: 'Servicio creado correctamente'
    });
    res.redirect('/servicios');
  },
  
  formEditar: (req, res) => {
    // Simulando un servicio
    const servicio = {
      id: req.params.id,
      nombre: 'Servicio de Ejemplo',
      descripcion: 'Descripción de ejemplo',
      precio: 1500
    };
    
    res.render('servicios/form', { 
      titulo: 'Editar Servicio',
      servicio,
      esEdicion: true
    });
  },
  
  actualizar: (req, res) => {
    // Aquí iría la lógica para actualizar en la base de datos
    req.flash('mensaje', {
      tipo: 'success',
      texto: 'Servicio actualizado correctamente'
    });
    res.redirect('/servicios');
  },
  
  eliminar: (req, res) => {
    // Aquí iría la lógica para eliminar de la base de datos
    req.flash('mensaje', {
      tipo: 'success',
      texto: 'Servicio eliminado correctamente'
    });
    res.redirect('/servicios');
  },
  
  detalles: (req, res) => {
    // Simulando un servicio
    const servicio = {
      id: req.params.id,
      nombre: 'Servicio de Ejemplo',
      descripcion: 'Descripción detallada del servicio de ejemplo',
      precio: 1500,
      imgReferencia: '/images/default-service.jpg'
    };
    
    res.render('servicios/detalles', { 
      titulo: servicio.nombre,
      servicio
    });
  }
};

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