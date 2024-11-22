const servicioUsuarios = require('../services/usuarios.servicios')
const { validationResult } = require('express-validator')


const crearUsuario = async(req, res)=>{
  /* validaciones */
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({msg: errors.array()})
  }
  /* validaciones */


  const result = await servicioUsuarios.nuevoUsuario(req.body)
  console.log(result)
  if(result.statusCode === 201){
    res.status(201).json({msg: result.msg, result})
  }else{
    res.status(500).json({msg: result.msg})
  }
}

const traerTodosLosUsuarios = async (req,res)=>{
  const result = await servicioUsuarios.obtenerUsuarios()
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg, result})
  }else{
    res.status(500).json({msg: result.msg})
  }
}

const traerUnUsuario = async(req, res)=>{
  const result = await servicioUsuarios.obtenerUnUsuario(req.params.id)
  if(result.statusCode === 200){
    res.status(200).json({usuario: result.usuario, msg: result.msg})
  }else{
    res.status(500).json({msg: result.msg})
  }
}

const actualizarUnUsuario =async(req, res)=>{
  const result  = await servicioUsuarios.actualizarUsuario(req.params.id, req.body)
  const usuarioActualizado =  result
  if(usuarioActualizado.statusCode === 200){
    res.status(200).json({msg: result.msg})
  }else{
    res.status(500).json({msg: result.msg})
  }
}

const eliminarUnUsuario =async (req, res)=>{
  const result = await servicioUsuarios.eliminarUsuario(req.params.id)
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg})
  }else{
    res.status(500).json({msg: result.msg})
  }
}


const inicioSesion = async (req, res)=>{
   /* validaciones */
   const errors = validationResult(req)
   if(!errors.isEmpty()){
     return res.status(400).json({msg: errors.array()})
   }
   /* validaciones */
  const result = await servicioUsuarios.inicioSesion(req.body) 

  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg, rol: result.rol, token: result.token, idUsuario: result.idUsuario})
  }else{
    res.status(400).json({msg: result.msg})
  }
}

const habilitarUnUsuario = async (req, res)=>{
  const result = await servicioUsuarios.habilitarUsuario(req.params.idUsuario)
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg})
  }else{
    res.status(400).json({msg: result.msg})
  }
}

const deshabilitarUnUsuario = async (req, res)=>{
  const result = await servicioUsuarios.deshabilitarUsuario(req.params.idUsuario)
  if(result.statusCode === 200){
    res.status(200).json({msg: result.msg})
  }else{
    res.status(400).json({msg: result.msg})
  }
}






module.exports = {
  crearUsuario,
  traerTodosLosUsuarios,
  traerUnUsuario,
  actualizarUnUsuario,
  eliminarUnUsuario,
  inicioSesion,
  habilitarUnUsuario,
  deshabilitarUnUsuario
}