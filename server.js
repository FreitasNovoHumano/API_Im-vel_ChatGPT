// server.js
const express = require('express');
const propertyRoutes = require('./src/routes/propertyRoutes');
const authRoutes = require('./src/routes/authRoutes');
const Property = require('./src/models/property');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Rota de autenticação
app.use('/api/auth', authRoutes);

// Rotas da API protegidas
app.use('/api/properties', propertyRoutes);

// Inicializa o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
