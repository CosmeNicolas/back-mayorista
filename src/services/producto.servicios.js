const ProductoModel = require('../models/productos.shema')
const cloudinary = require('../helpers/cloudinary')
const UsuarioModel = require('../models/usuarios.shema')

const nuevoProducto = async (body) => {
  try {
    const producto = new ProductoModel(body);
    await producto.save();
    return {
      msg: "Producto Creado",
      statusCode: 201,
      _id: producto._id, // Asegúrate de devolver el _id
    };
  } catch (error) {
    return {
      msg: "Error al crear el producto",
      statusCode: 500,
      error,
    };
  }
};

const traerProductos = async()=>{
  try {
    const productos = await ProductoModel.find()
    /* console.log(productos) */
    return {
      msg:'Productos encontrados',
      statusCode: 200,
      productos
    }
  } catch (error) {
    return {
      msg: 'Error al solicitar los productos',
      statusCode: 500,
      error
    }
  }
}

const mostrarProducto = async(idProducto)=>{
  try {
    console.log(idProducto)
    const producto = await ProductoModel.findById(idProducto)
    console.log(producto)
    return{
      msg:'Producto Encontrado',
      producto,
      statusCode: 200,
    }
  } catch (error) {
    return{
      msg:'Producto no encontrado',
      error,
      statusCode: 500,
    }
  }
}

const actualizarElProducto = async (idProducto, body)=>{
  try {
    await ProductoModel.findByIdAndUpdate({ _id: idProducto }, body)
   
    return {
      msg: 'Producto actualizado',
      statusCode: 200
    }
  } catch (error) {
    return{
      msg:'Producto no encontrado',
      error,
      statusCode: 500,
    }
  }
  /* mandamos la respuesta */
}

const eliminarUnProducto = async(idProducto) => {
  const productoExiste = await ProductoModel.findById(idProducto)

  if (productoExiste) {
    await ProductoModel.findByIdAndDelete({ _id: idProducto })
    const productos = await ProductoModel.find()
    return {
      msg: 'Producto eliminado',
      productos: productos,
      statusCode: 200
    }
  } else {
    return {
      msg: 'ID incorrecto',
      statusCode: 400
    }
  }
};


const imagenProducto = async (idProducto, file) => {
  try {
    if (!file || !file.path) {
      return {
        msg: "No se ha proporcionado un archivo válido",
        statusCode: 400,
      };
    }

    const producto = await ProductoModel.findById(idProducto);
    if (!producto) {
      return {
        msg: "Producto no encontrado",
        statusCode: 404,
      };
    }

    const imagen = await cloudinary.uploader.upload(file.path, {
      folder: "productos",
    });

    producto.imagen = imagen.secure_url;
    await producto.save();

    return {
      msg: "Imagen y producto cargado",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error en imagenProducto:", error);
    return {
      msg: "No se pudo cargar la imagen del producto",
      error: error.message,
      statusCode: 500,
    };
  }
};
/* Servicio imagen producto */


const agregarProductoFav = async(idProducto,idUsuario)=>{
  try {
   const producto = await ProductoModel.findById(idProducto)
   const usuario = await UsuarioModel.findById(idUsuario)
   console.log(producto)
   console.log(usuario)
 
   const productoExiste =  usuario.favoritos.find((prod)=> prod.id === idProducto)
  
 
   if(productoExiste){
     return{
       msg: 'Producto ya existe en favoritos',
       statusCode: 400
     }
   }
 
   usuario.favoritos.push(producto)
   await usuario.save()
   return{
     msg: 'Producto agregado a Favoritos',
     statusCode: 200
   }
  } catch (error) {
   
    return{
       statusCode: 500,
       msg: 'error al agregar el producto a favoritos'
     }
  }
 }
 


const agregarProductoCarrito = async(idProducto,idUsuario)=>{
console.log( idUsuario)
 try {
  const producto = await ProductoModel.findById(idProducto)
  const usuario = await UsuarioModel.findById(idUsuario)
  console.log(producto)
  console.log(usuario)
  const productoExiste = usuario.carrito.find((prod)=> prod.id === idProducto)

  if(productoExiste){
    return{
      msg: 'Producto ya existe en el carrito',
      statusCode: 400
    }
  }

  usuario.carrito.push(producto)
  await usuario.save()

  return{
    msg: 'Producto agregado al carrito',
    statusCode: 200
  }
 } catch (error) {
  return{
    statusCode: 500,
    msg: 'error al agregar el producto al Carrito'
  }
 }
}



const borrarProductoFav = async(idProducto,idUsuario)=>{
  try {
   
   const usuario = await UsuarioModel.findById(idUsuario)
 
   const posicionProducto =  usuario.favoritos.findIndex((prod)=> prod.id === idProducto)
 
  
 
   usuario.favoritos.splice(posicionProducto, 1)
   await usuario.save()
 
   return{
     msg: 'Producto Borrado a Favoritos',
     statusCode: 200
   }
  } catch (error) {
     return{
       statusCode: 500,
       msg: 'error al borrar el producto a favoritos'
     }
  }
 }

 const borrarProductoCarrito = async(idProducto,idUsuario)=>{
  try {
   
   const usuario = await UsuarioModel.findById(idUsuario)
 
   const posicionProducto =  usuario.favoritos.findIndex((prod)=> prod.id === idProducto)
 
  
 
   usuario.carrito.splice(posicionProducto, 1)
   await usuario.save()
 
   return{
     msg: 'Producto Borrado del carrito',
     statusCode: 200
   }
  } catch (error) {
     return{
       statusCode: 500,
       msg: 'error al borrar el producto del carrito'
     }
  }
 }

 const habilitarProducto = async(idProducto)=>{
    const producto = await ProductoModel.findById(idProducto)
    producto.bloqueado = false
    await producto.save()
    return {
      msg: 'Producto habilitado',
      statusCode: 200
    }
 }


 const inhabilitarProducto = async(idProducto)=>{
  
    const producto = await ProductoModel.findById(idProducto)
    producto.bloqueado = true
    await producto.save()
  
    return {
      msg: 'Producto deshabilitado',
      statusCode: 200,
    }
 }

 const obtenerProductosFavoritos = async(idUsuario) =>{
  console.log(idUsuario)
  const usuario = await UsuarioModel.findById(idUsuario)
  console.log(usuario)
  return{
    productos: usuario.favoritos,
    statusCode: 200
  }

}

const obtenerProductosCarrito = async(idUsuario) =>{
  const usuario = await UsuarioModel.findById(idUsuario)
  return{
    productos: usuario.carrito,
    statusCode: 200
  }
}


module.exports = {
  nuevoProducto,
  traerProductos,
  mostrarProducto,
  actualizarElProducto,
  eliminarUnProducto,
  imagenProducto,
  agregarProductoCarrito,
  agregarProductoFav,
  borrarProductoCarrito,
  borrarProductoFav,
  habilitarProducto,
  inhabilitarProducto,
  obtenerProductosFavoritos,
  obtenerProductosCarrito
}