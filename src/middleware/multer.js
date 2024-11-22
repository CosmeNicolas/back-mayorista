const multer = require('multer')
const path = require('path')

module.exports = multer({
  storage: multer.diskStorage({}),
  /* recibe req, file, callback */
  fileFilter: (req, file, cb) => {
    /* extname - nombre la ruta original */
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      return cb(new Error("Formato incorrecto"), false);
    }
    /* el error tiene q ser null y el aceptefile debe ser true */
    cb(null, true);
  },
});