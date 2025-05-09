// Aplicación principal para la Galería Fotográfica
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const fs = require('fs');
require('dotenv').config();

// Importar rutas
const servicioRoutes = require('./routes/servicioRoutes.js');
// Importar otros archivos de rutas cuando sea necesario
// const categoriaRoutes = require('./routes/categoriaRoutes');
// const usuarioRoutes = require('./routes/usuarioRoutes');

// Inicializar la aplicación Express
const app = express();

// Configurar puerto
const PORT = process.env.PORT || 3000;

// Configurar middleware
app.use(morgan('dev')); // Logging de solicitudes HTTP
app.use(express.json()); // Parsear solicitudes JSON
app.use(express.urlencoded({ extended: false })); // Parsear solicitudes de formularios

// Configurar sesiones y flash messages
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto-de-galeria',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hora
}));
app.use(flash());

// Middleware para variables globales
app.use((req, res, next) => {
  res.locals.mensaje = req.flash('mensaje');
  res.locals.usuario = req.session.usuario || null;
  next();
});

// Configurar motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Asegurar que exista el directorio de uploads
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Rutas
app.use('/servicios', servicioRoutes);
// Usar otras rutas cuando sea necesario
// app.use('/categorias', categoriaRoutes);
// app.use('/usuarios', usuarioRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Inicio' });
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render('404', { titulo: 'Página no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    titulo: 'Error', 
    error: process.env.NODE_ENV === 'production' ? {} : err 
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});