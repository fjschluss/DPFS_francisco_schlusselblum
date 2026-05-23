const express = require('express');
const router = express.Router();
const apiUsersController    = require('../controllers/api.users.controller');
const apiProductsController = require('../controllers/api.products.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

// Rutas estáticas primero
router.get('/users',           apiUsersController.list);
router.get('/products',        apiProductsController.list);

// Rutas con parámetro :id después
router.get('/users/:id',       apiUsersController.detail);
router.get('/products/:id',    apiProductsController.detail);

// Rutas de admin (requieren sesión activa con rol admin)
router.put('/users/:id/role',  isAuthenticated, isAdmin, apiUsersController.toggleRole);
router.delete('/users/:id',    isAuthenticated, isAdmin, apiUsersController.destroyUser);

module.exports = router;