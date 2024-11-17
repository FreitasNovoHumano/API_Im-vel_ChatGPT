// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido. Acesso negado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded; // Armazena os dados do usuário no request para uso posterior
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
