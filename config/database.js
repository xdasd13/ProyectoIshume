// Configuración de la conexión a MySQL
const mysql = require('mysql2/promise');
require('dotenv').config();

// Creación del pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dbgaleria',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportamos el pool para usarlo en los modelos
module.exports = pool;