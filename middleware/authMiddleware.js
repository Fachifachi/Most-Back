const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token' });
  }

  jwt.verify(token, 'tu_secreto_super_secreto', (err, user) => { // Reemplaza con una clave secreta real y segura
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user; // Agrega la información del usuario al objeto de solicitud
    next(); // Continúa con la siguiente función en la cadena
  });
};

module.exports = { verifyToken };
