const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');

// Rutas estáticas primero (antes de las que tienen :id)
router.get('/',         productsController.list);
router.get('/create',   isAuthenticated, productsController.createForm);
router.post('/',        isAuthenticated, productsController.create);

// Rutas con parámetro :id después
router.get('/:id/edit', isAuthenticated, productsController.editForm);
router.put('/:id',      isAuthenticated, productsController.edit);
router.delete('/:id',   isAuthenticated, productsController.destroy);
router.get('/:id',      productsController.detail);

module.exports = router;