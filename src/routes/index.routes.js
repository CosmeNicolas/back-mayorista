// En tu archivo index.routes.js
const { Router } = require('express');
const router = Router();

// Asegúrate que estas rutas estén correctamente importadas
router.use('/productos', require('./productos.routes'));
router.use('/usuarios', require('./usuarios.routes'));
router.use('/pagos', require('./pagos.routes')); // Esta es la importante
router.get('/test', (req, res) => {
  res.json({ message: "Ruta de pagos funciona!" });
});
router.use('/contacto', require('./contacto.routes'));
router.get('/test', (req, res) => {
  res.json({ message: "Ruta principal funcionando" });
});


module.exports = router;