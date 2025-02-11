const express = require('express');
const app = express();
const db = require('./config/db');  // Conexión a la base de datos
const cors = require('cors');
app.use(cors());


const helmet = require('helmet');

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Categorías');
});

// Configura Content Security Policy con Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],  // Permite scripts en línea (solo si es necesario)
      styleSrc: ["'self'", "'unsafe-inline'"],   // Permite estilos en línea
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],  // Permite cargar fuentes desde un dominio específico
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
    },
  },
}));

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const cajaRoutes = require('./routes/cajaRoutes');
const tamanioRoutes = require('./routes/tamanioRoutes');
const paqueteRoutes = require('./routes/paqueteRoutes');
const subcategoriaRoutes = require('./routes/subcategoriaRoutes');
const porcentajeImpuestosRoutes = require('./routes/porcentajeImpuestosRoutes');
const medioPagoRoutes = require('./routes/medioPagoRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');
const insumoRoutes = require('./routes/insumoRoutes'); // Importar rutas de insumos
const empleadoRoutes = require('./routes/empleadoRoutes'); // Importar rutas de insumos
const provinciaRoutes = require('./routes/provinciaRoutes');
const localidadRoutes = require('./routes/localidadRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const cocinaRoutes = require('./routes/cocinaRoutes');
const armadorRoutes = require('./routes/armadorRoutes');
const turneraRoutes = require('./routes/turneraRoutes');
const loginRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
// Usar rutas
app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/cajas', cajaRoutes);
app.use('/tamanios', tamanioRoutes);
app.use('/paquetes', paqueteRoutes);
app.use('/subcategorias', subcategoriaRoutes);
app.use('/porcentajes', porcentajeImpuestosRoutes);
app.use('/medios_pago', medioPagoRoutes);
app.use('/sucursales', sucursalRoutes);
app.use('/insumos', insumoRoutes); // Usar rutas de insumos
app.use('/empleados', empleadoRoutes); // Usar rutas de insumos
app.use('/provincias', provinciaRoutes);
app.use('/localidades', localidadRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/cocina', cocinaRoutes);
app.use('/armador', armadorRoutes);
app.use('/turnera', turneraRoutes);
app.use('/login', loginRoutes);
app.use('/tickets', ticketRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000.');
});
