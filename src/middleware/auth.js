const jwt = require('jsonwebtoken');

module.exports = (rol) => (req, res, next) => {
  try {
    const token = req.header('auth');  // Leer el token desde la cabecera 'auth'
    console.log('Token recibido:', token);

    if (!token) {
      return res.status(401).json({ msg: 'No estás autorizado. Token no proporcionado.' });
    }

    // Verificar el token con la clave secreta
    const verificarToken = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar si el rol coincide
    if (verificarToken.rol === rol) {
      req.idUsuario = verificarToken.idUsuario;  // Guardar idUsuario en req para futuros usos
      next();  // Continuar al siguiente middleware
    } else {
      return res.status(403).json({ msg: 'No tienes los permisos necesarios para esta acción.' });
    }
  } catch (error) {
    console.error('Error al verificar el token:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'El token ha expirado.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ msg: 'El token es inválido.' });
    } else {
      return res.status(500).json({ msg: 'Error en el servidor al verificar el token.' });
    }
  }
};
