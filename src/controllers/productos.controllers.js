const { validationResult } = require('express-validator')
const serviciosProductos = require('../services/producto.servicios')



const crearProducto = async (req, res)=>{
  /* validaciones */
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({msg: errors.array()})
    }
    /* validaciones */
   const result = await  serviciosProductos.nuevoProducto(req.body)
    if(result.statusCode === 201){
      res.status(201).json({msg:result.msg})
    }else{
      res.status(500).json({msg:result.msg})
    }
  } catch (error) {
    console.log(error)
  }
}

const mostrarProductos = async (req, res)=>{
  const result = await serviciosProductos.traerProductos()
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg, productos: result.productos})
  }else{
    res.status(500).json({msg: result.msg})
  }
}

const mostrarUnProducto = async (req, res)=>{
  const result = await serviciosProductos.mostrarProducto(req.params.idProducto)
 
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg, producto: result.producto})
  }else{
    res.status(500).json({msg: result.msg})
  }
}

const actualizarProducto = async (req, res)=>{
  /* validaciones */
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({msg: errors.array()})
  }
  /* validaciones */
  /* recibo el id por parametro */
  const result = await serviciosProductos.actualizarElProducto(req.params.id, req.body)
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg})
  }else{
    res.status(500).json({msg: result.msg})
  }
}

const eliminarProducto = async (req, res) => {
  try {
    const result = await serviciosProductos.eliminarUnProducto(req.params.idProducto);  // Espera el resultado de la promesa
    if (result.statusCode === 200) {
      return res.status(200).json({ msg: result.msg });
    } else {
      return res.status(result.statusCode).json({ msg: result.msg });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Error en el servidor al eliminar el producto', error });
  }
};

/* agregar imagen producto -  pasamos el id y el archivo file*/
const agregarImagenProducto = async (req, res)=>{
  try {
    const result = await serviciosProductos.imagenProducto(req.params.id, req.file)
    if(result.statusCode === 200){
      res.status(200).json({msg: result.msg})
    }else{
      res.status(500).json({msg: result.msg})
    }
  } catch (error) {
    console.log(error)
  }
}

const agregarProductoAFavoritos = async (req, res)=>{
  try {
    const result = await serviciosProductos.agregarProductoFav(req.params.idProducto, req.idUsuario)
    console.log(result)
    if(result.statusCode === 200){
      res.status(200).json({msg: result.msg})
    }else{
      res.status(500).json({msg: result.msg})
    }
  } catch (error) {
    console.log(error)
  }
}

const agregarProductoAlCarrito= async (req, res)=>{
  try {
    const result = await serviciosProductos.agregarProductoCarrito(req.params.idProducto, req.idUsuario)
    if(result.statusCode === 200){
      res.status(200).json({msg: result.msg})
    }else{
      res.status(500).json({msg: result.msg})
    }
  } catch (error) {
    console.log(error)
  }
}


const borrarProductoDeFavoritos = async (req, res)=>{
  try {
    const result = await serviciosProductos.borrarProductoFav(req.params.id, req.idUsuario)
    if(result.statusCode === 200){
      res.status(200).json({msg: result.msg})
    }else{
      res.status(500).json({msg: result.msg})
    }
  } catch (error) {
    console.log(error)
  }
}

const borrarProductoCarrito = async (req, res)=>{
  try {
    const result = await serviciosProductos.borrarProductoCarrito(req.params.id, req.idUsuario)
    if(result.statusCode === 200){
      res.status(200).json({msg: result.msg})
    }else{
      res.status(500).json({msg: result.msg})
    }
  } catch (error) {
    console.log(error)
  }
}

const habilitarUnProducto = async (req, res)=>{
  try {
    const result = await serviciosProductos.habilitarProducto(req.idProducto)
    if(result.statusCode === 200){
      res.status(200).json({msg: result.msg})
    }else{
      res.status(500).json({msg: result.msg})
    }
  } catch (error) {
    console.log(error)
  }
}


const deshabilitarUnProducto = async(req, res)=>{
  try {
    const result = await serviciosProductos.inhabilitarProducto(req.idProducto)
    if(result.statusCode === 200){
      res.status(200).json({msg: result.msg})
    }else{
      res.status(500).json({msg: result.msg})
    }
  } catch (error) {
    console.log(error)
  }
}

const obtenerFavoritoUsuario =async (req, res)=>{
  const result = await  serviciosProductos.obtenerProductosFavoritos(req.idUsuario)
  console.log(result)
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg, productos: result.usuario})
  }
}

const obtenerProductoCarritoUsuario = async(req, res) => {
  const result = await serviciosProductos.obtenerProductosCarrito(req.idUsuario)
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg, productos: result.productos} )
  }else{
    res.status(400).json({msg: result.msg})
  }
}

/* exportamso los controladores */
module.exports = {
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
  obtenerProductoCarritoUsuario,
  obtenerFavoritoUsuario
}