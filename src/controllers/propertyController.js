const Property = require('../models/property');

// Banco de dados em memória
let propertiesDB = [];

// Criar um imóvel
const createProperty = (req, res) => {
  const { title, description, price, type, address, bedrooms, bathrooms, area } = req.body;
  const newProperty = new Property(
    propertiesDB.length + 1,
    title,
    description,
    price,
    type,
    address,
    bedrooms,
    bathrooms,
    area
  );
  
  propertiesDB.push(newProperty);
  res.status(201).json(newProperty);
};

// Listar todos os imóveis
const getAllProperties = (req, res) => {
  res.status(200).json(propertiesDB);
};

// Obter imóvel por ID
const getPropertyById = (req, res) => {
  const { id } = req.params;
  const property = propertiesDB.find((p) => p.id == id);
  if (!property) {
    return res.status(404).json({ message: 'Imóvel não encontrado' });
  }
  res.status(200).json(property);
};

// Deletar imóvel
const deleteProperty = (req, res) => {
  const { id } = req.params;
  const index = propertiesDB.findIndex((p) => p.id == id);
  if (index === -1) {
    return res.status(404).json({ message: 'Imóvel não encontrado' });
  }
  propertiesDB.splice(index, 1);
  res.status(204).send();
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
};
