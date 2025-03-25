const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  mostrarProductos,
  mostrarUnProducto,
  eliminarProducto,
  actualizarProducto,
  agregarImagenProducto,
  agregarProductoAFavoritos,
  agregarProductoAlCarrito,
  borrarProductoDeFavoritos,
  borrarProductoCarrito,
  habilitarUnProducto,
  deshabilitarUnProducto,
  obtenerFavoritoUsuario,
  obtenerProductoCarritoUsuario,
} = require("../controllers/productos.controllers");
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", mostrarProductos);

router.get("/:idProducto", /* auth('usuario'), */ mostrarUnProducto);

router.get(
  "/obtenerFavoritoCarrito/",
  /* auth('usuario'), */ obtenerFavoritoUsuario
);
router.get(
  "/obtenerProdCart",
  /* auth('usuario'), */ obtenerProductoCarritoUsuario
);

/* actualizaciones */
router.put(
  "/:id",
  [
    check("nombreProducto", "El PRODUCTO no debe estar vacio").not().isEmpty(),
    check("precio", "Campo PRECIO vacio").not().isEmpty(),
    check("descripcion", "campo DESCRIPCION vacio ").isLength({
      min: 8,
      max: 40,
    }),
  ],
  auth("admin"),
  actualizarProducto
);

router.put("/habilitar/:idProducto" /* ,auth('admin') */, habilitarUnProducto);
router.put(
  "/deshabilitar/:idProducto" /* ,auth('admin') */,
  deshabilitarUnProducto
);

router.post(
  "/",
  [
    check("nombreProducto", "El PRODUCTO no debe estar vacio").not().isEmpty(),
    check("precio", "Campo PRECIO vacio").not().isEmpty(),
    check("descripcion", "campo DESCRIPCION vacio ").isLength({
      min: 8,
      max: 40,
    }),
  ],
  crearProducto
);
router.post(
  "/agregarProdFav/:idProducto",
  auth("usuario"),
  agregarProductoAFavoritos
);
router.post(
  "/agregarProdCart/:idProducto",
  auth("usuario"),
  agregarProductoAlCarrito
);

router.delete(
  "/borrarProdFav/:idProducto",
  /* auth('usuario'), */ borrarProductoDeFavoritos
);
router.delete(
  "/borrarProdCart/:idProducto",
  /* auth('usuario'), */ borrarProductoCarrito
);
router.delete("/:idProducto", /* auth('admin'), */ eliminarProducto);

/* rutas imagenes al producto / .single para una fotos, .array muchas fotos */
router.post(
  "/agregarImagen/:id",
  multer.single("imagen"),
  agregarImagenProducto
);

/* exportamos  */
module.exports = router;
