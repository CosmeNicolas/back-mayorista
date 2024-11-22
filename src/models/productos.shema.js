const {Schema, model} = require('mongoose')

const ProductoSchema = new Schema({
  nombreProducto: {
    type: String,
    required: true,
    trim: true,
    min: [5,'Minimos permitido 5 caracteres'],
    max: [50, 'Maximo permitido 50 caracteres'],
  },
  precio:{
    type:Number,
    required: true,
  },
  descripcion:{
    type:String,
    required: true,
    trim: true
  },
  imagen:{
    type: String,
    default: ''
  },
  bloqueado: {
    type: Boolean,
    default: false
  }
})

const ProductoModel = model('productos',ProductoSchema)

module.exports = ProductoModel