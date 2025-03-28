/* usamos express para levantar el servidor  */
/* require('dotenv').config()
require('./DB/config')
const express = require("express");
const path = require("path");
const cors = require('cors')
const morgan = require('morgan')

const app = express(); */


/* formatos de imagenes  */
/* app.use(express.urlencoded({extended: true})) */

/* 
app.use(morgan('dev'))
app.use(cors())
app.use(express.json()); */



/* app.use(express.static(path.join(__dirname, "../public"))); */


/* MIDDLEWARE - habilitan cosas - nos traduce los datos para ser leido */
/* app.use('/api', require('./routes/index.routes')) */
/* MIDDLEWARE */
/* 
app.listen(3001, () => {
  console.log("servidor okey ", 3001);
}); */


require('dotenv').config();
require('./DB/config');
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth']
}));
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Rutas API
app.use('/api', require('./routes/index.routes'));

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Export para Vercel + inicio local
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}