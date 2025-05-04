const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombreProducto: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "Mínimo permitido 5 caracteres"],
    maxlength: [50, "Máximo permitido 50 caracteres"]
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  imagen: {
    type: String,
    default: '',
  },
  bloqueado: {
    type: Boolean,
    default: false,
  },
  categoria: {
    type: String,
    required: true,
    enum: [
      'COLECCION OTOÑO INVIERNO 2025',
      'CAMPERAS Y ABRIGOS',
      'CHALECOS',
      'POLLERAS Y SHORT',
      'SASTRERIA',
      'PANTALON',
      'CAMISAS Y REMERAS'
    ]
  },
  stockPorTalle: {
    type: Map,
    of: Number,
    default: {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0
    }
  }
});

const ProductoModel = model("productos", ProductoSchema);

module.exports = ProductoModel;
