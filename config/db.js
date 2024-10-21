const mysql = require('mysql2');

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',           // Cambia si tu base de datos está en otro lugar
  user: 'root',   // Usuario de la base de datos
  password: '',       // Contraseña de la base de datos
  database: 'restobar',  // Nombre de la base de datos
});

// Conectarse a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

module.exports = connection;
