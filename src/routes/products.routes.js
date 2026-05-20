const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const { productValidators } = require('../middlewares/validators/product.validators');

// Rutas estáticas primero (antes de las que tienen :id)
router.get('/',         productsController.list);
router.get('/create',   isAuthenticated, productsController.createForm);
router.post('/',        isAuthenticated, productValidators, productsController.create);

// Rutas con parámetro :id después
router.get('/:id/edit', isAuthenticated, productsController.editForm);
router.put('/:id',      isAuthenticated, productValidators, productsController.edit);
router.delete('/:id',   isAuthenticated, productsController.destroy);
router.get('/:id',      productsController.detail);

module.exports = router;