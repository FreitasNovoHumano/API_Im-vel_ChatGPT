// src/routes/propertyRoutes.js
const express = require('express');
const propertyController = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para criar imóvel
router.post('/', authMiddleware, propertyController.createProperty);

// Rota para listar todos os imóveis
router.get('/', authMiddleware, propertyController.getAllProperties);

// Rota para obter imóvel por ID
router.get('/:id', authMiddleware, propertyController.getPropertyById);

// Rota para deletar imóvel
router.delete('/:id', authMiddleware, propertyController.deleteProperty);

module.exports = router;
