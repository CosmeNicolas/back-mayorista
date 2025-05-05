const { Router } = require('express');
const router = Router();

// Rutas principales
router.use('/productos', require('./productos.routes'));
router.use('/usuarios', require('./usuarios.routes'));
router.use('/pagos', require('./pagos.routes'));
router.use('/contacto', require('./contacto.routes'));

// Rutas de prueba
router.get('/test-pagos', (req, res) => {
  res.json({ message: "Ruta de pagos funciona!" });
});

router.get('/test-general', (req, res) => {
  res.json({ message: "Ruta principal funcionando" });
});

module.exports = router;
