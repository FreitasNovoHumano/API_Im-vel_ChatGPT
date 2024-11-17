const request = require('supertest');
const express = require('express');
const propertyRoutes = require('../src/routes/propertyRoutes');
const Property = require('../src/models/property');

// Configuração da instância do app Express
const app = express();
app.use(express.json());
app.use('/api/properties', propertyRoutes);

// Definição do banco de dados em memória
let propertiesDB = [
  new Property(1, "Casa na Praia", "Linda casa com vista para o mar", 500000, "Casa", "Avenida da Praia, 123", 3, 2, 200),
];

describe('Property API Endpoints', () => {

  beforeEach(() => {
    // Reinicializar o banco de dados em memória
    propertiesDB = [
      new Property(1, "Casa na Praia", "Linda casa com vista para o mar", 500000, "Casa", "Avenida da Praia, 123", 3, 2, 200),
    ];
  });

  test('Deve criar um novo imóvel', async () => {
    const newProperty = {
      title: "Apartamento Luxo",
      description: "Apartamento com vista panorâmica",
      price: 800000,
      type: "Apartamento",
      address: "Rua das Flores, 456",
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
    };

    const response = await request(app).post('/api/properties').send(newProperty);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newProperty.title);
  });

  test('Deve listar todos os imóveis', async () => {
    const response = await request(app).get('/api/properties');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('Deve obter um imóvel pelo ID', async () => {
    const response = await request(app).get('/api/properties/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  test('Deve retornar erro 404 ao tentar obter um imóvel inexistente', async () => {
    const response = await request(app).get('/api/properties/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Imóvel não encontrado');
  });

  test('Deve deletar um imóvel pelo ID', async () => {
    const response = await request(app).delete('/api/properties/1');
    expect(response.statusCode).toBe(204);
  });

  test('Deve retornar erro 404 ao tentar deletar um imóvel inexistente', async () => {
    const response = await request(app).delete('/api/properties/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Imóvel não encontrado');
  });
});
