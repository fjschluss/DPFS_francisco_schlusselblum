// src/routes/api.routes.js
const express = require('express');
const router = express.Router();
const apiUsersController    = require('../controllers/api.users.controller');
const apiProductsController = require('../controllers/api.products.controller');

// Rutas estáticas primero
router.get('/users',        apiUsersController.list);
router.get('/products',     apiProductsController.list);

// Rutas con parámetro :id después
router.get('/users/:id',    apiUsersController.detail);
router.get('/products/:id', apiProductsController.detail);

module.exports = router;