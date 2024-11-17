// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Usuário de exemplo
const user = {
  id: 1,
  username: 'admin',
  password: '$2a$10$W/0IhdUzLgHeXuKImuVGpepu9W/bD/Nv7vwfV0B2MntzJ3dRv1i2y' // senha "senha123" hashada
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (username !== user.username) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h'
  });
  
  res.json({ token });
};

module.exports = { login };
