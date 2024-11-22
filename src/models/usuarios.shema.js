const {Schema, model} = require('mongoose')

const UsuarioSchema = new Schema({
  nombreUsuario:{
  type: String,
  required: true,
  trim: true,
  unique: true,
  },
  password:{
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, 'Por favor ingrese un correo válido'] // Valida el formato del correo
  },
  rol:{
    type: String,
    default: 'usuario',
    enum:['usuario', 'admin']
  },
  bloqueado:{
    type: Boolean,
    default: false
  },
  carrito:[],
  favoritos: []
}
 
);
/* filtramos lo q no queremos enviar al front, usamos this para hacer referencia a la clase o al objetto y lo pasamos a objeto ya que JSON es String*/
UsuarioSchema.methods.toJSON = function () {
  const { password, ...usuario } = this.toObject(); // Usar toObject() para acceder al documento
  return usuario;
};

/* Objeto de JSON > Objeto > Desestructuro */
const UsuarioModel = model('usuario',UsuarioSchema)

module.exports = UsuarioModel