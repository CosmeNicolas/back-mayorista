/* creamos las rutas de la carpeta de rutas */
const {Router} = require('express')
const router = Router()
const pagosRoutes = require('./pagos.routes');


router.use('/productos', require('./productos.routes'))
router.use('/usuarios', require('./usuarios.routes'))
router.use('/pagos', pagosRoutes);


module.exports =  router