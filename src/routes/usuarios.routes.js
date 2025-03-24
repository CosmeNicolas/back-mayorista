const {Router} = require('express')
const { crearUsuario, traerTodosLosUsuarios, traerUnUsuario, actualizarUnUsuario, eliminarUnUsuario, inicioSesion, habilitarUnUsuario, deshabilitarUnUsuario } = require('../controllers/usuarios.controllers')
const auth = require('../middleware/auth')
const { check } = require('express-validator')
const router = Router()


router.post(
  "/",
  [
    check("nombreUsuario", "El campo no debe estar vacio").not().isEmpty(),
    check(
      "nombreUsuario",
      "El campo debe tener como minimo 5 caracteres"
    ).isLength({ min: 5 }),
    check("password", "Campo PASSWORD VACIO").not().isEmpty(),
    check("password", "Min: 8 y Max: 40").isLength({ min: 8, max: 40 }),
  ],
  crearUsuario
);
router.post('/login',
  [check('nombreUsuario', "El campo no debe estar vacio").not().isEmpty(),
    /* chequeamos longitud */
    /* check('nombreUsuario',"El campo debe tener como minimo 5 caracteres").isLength({min:5}), */
    check('password', 'Campo PASSWORD VACIO').not().isEmpty(),
    check('password', 'Min: 8 y Max: 40').isLength({min:8,max:40})
  ],inicioSesion)
router.get('/',auth('admin'), traerTodosLosUsuarios)
router.get('/:idUsuario',/* auth('admin'), */ traerUnUsuario)
router.put('/:idUsuario',/* auth('admin'), */ actualizarUnUsuario)
router.put('/habilitar/:idUsuario',/* auth('admin'), */habilitarUnUsuario)
router.put('/deshabilitar/:idUsuario',/* auth('admin'), */deshabilitarUnUsuario)
router.delete('/:idUsuario',auth('admin'),eliminarUnUsuario)

module.exports = router