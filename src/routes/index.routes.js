/* creamos las rutas de la carpeta de rutas */
const {Router} = require('express')
const router = Router()

router.use('/productos', require('./productos.routes'))
router.use('/usuarios', require('./usuarios.routes'))
/* router.use('/api/categorias', require('./productos.routes')) */

module.exports =  router