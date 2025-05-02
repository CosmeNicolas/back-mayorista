const UsuarioModel = require('../models/usuarios.shema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {registroUsuario} = require('../helpers/messages')

const nuevoUsuario = async (body) => {
  try {
    const usuarioExiste = await UsuarioModel.findOne({nombreUsuario: body.nombreUsuario})
    if(usuarioExiste){
      return {
        msg: 'Usuario no Disponible',
        statusCode: 409
      }
    }

    const usuario = new UsuarioModel(body)
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(body.password, salt);

    await usuario.save();
    
    // Modificado para devolver el usuario creado
    return {
      msg: 'Usuario Creado',
      statusCode: 201,
      usuario: {
        id: usuario._id,
        nombreUsuario: usuario.nombreUsuario,
        correo: usuario.correo,
        rol: usuario.rol
      }
    }
  } catch (error) {
    console.error("Error en servicio:", error);
    return {
      msg: 'Error al crear el Usuario',
      statusCode: 500,
      error: error.message // Solo el mensaje para no exponer detalles internos
    }
  }
}



const obtenerUsuarios = async()=>{
  try {
    const usuarios = await UsuarioModel.find()
    return{
      msg: 'Usuarios Encontrados',
      statusCode: 200,
      usuarios: usuarios
    }
  } catch (error) {
    return {
      msg: 'Usuario no encontrados',
      statusCode: 500,
      error
    }
  }
}

const obtenerUnUsuario = async (idUsuario)=>{
  try {
    const usuario = await UsuarioModel.findById(idUsuario)
    return{
      msg:'Usuario Encontrado',
      usuario,
      statusCode: 200
    }
  } catch (error) {
    return{
      msg: 'Error al buscar el usuario',
      satusCode: 500,
      error
    }
  }
}

const actualizarUsuario = async (idUsuario, body) => {
  try {
    const usuario = await UsuarioModel.findByIdAndUpdate(idUsuario, body, { new: true }); // Agrega { new: true }
    if (!usuario) {
      return {
        msg: "Usuario no encontrado",
        statusCode: 404,
      };
    }
    return {
      msg: "Usuario Actualizado",
      statusCode: 200,
      usuario: usuario,
    };
  } catch (error) {
    return {
      msg: "Error al Actualizar el usuario",
      statusCode: 500,
      error,
    };
  }
};

const eliminarUsuario = async (idUsuario) => {
  try {
    await UsuarioModel.findByIdAndDelete(idUsuario);
    return {
      msg: "Usuario Eliminado",
      statusCode: 200,
    };
  } catch (error) {
    return {
      msg: "No se pudo eliminar el usuario",
      statusCode: 500,
      error,
    };
  }
};


/* CREO el inicio de Sesion - JWT */
const inicioSesion = async (body) =>{
  try {
    const usuarioExiste = await UsuarioModel.findOne({nombreUsuario: body.nombreUsuario})
    if(!usuarioExiste){
      return {
        msg:'Usuario o Contraseña incorrecto USUARIO',
        nombreUsuario: usuarioExiste.nombreUsuario,
        statusCode: 400
      }
    }
    /* comparacion */
    const checkPassword = bcrypt.compareSync(body.password, usuarioExiste.password)
    if(!checkPassword){
      return {
        msg:'Usuario o Contraseña incorrecto PASSWORD',
        statusCode: 400
      }
    }
    /* CREAMOS EL PAULOAD */
    const payload = {
      idUsuario : usuarioExiste._id,
      rol: usuarioExiste.rol
    }
    /* cREO EL TOKEN -  JWT*/
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return{
      token,
      rol: usuarioExiste.rol,
      idUsuario: usuarioExiste._id,
      msg:'Usuario Logueado',
      statusCode: 200
    }
  /*token , header - payload - signature*/
  } catch (error) {
    return {
      msg: 'Error interno del servidor',
      statusCode: 500,
      error
    };
  }
  
}

const habilitarUsuario = async(idUsuario)=>{
  const usuario =  await UsuarioModel.findById(idUsuario)
  usuario.bloqueado = false
  await usuario.save()

  return{
    msg:'Usuario habilitado',
    statusCode: 200
  }
}

const deshabilitarUsuario = async(idUsuario)=>{
  const usuario =  await UsuarioModel.findById(idUsuario)
  usuario.bloqueado = true
  await usuario.save()

  return{
    msg:'Usuario deshabilitado',
    statusCode: 200
  }
}

module.exports = {
  nuevoUsuario,
  obtenerUsuarios,
  obtenerUnUsuario,
  actualizarUsuario,
  eliminarUsuario,
  inicioSesion,
  habilitarUsuario,
  deshabilitarUsuario
}