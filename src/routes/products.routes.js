const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const { productValidators } = require('../middlewares/validators/product.validators');

// Rutas estáticas primero
router.get('/',           productsController.list);
router.get('/create',     isAuthenticated, isAdmin, productsController.createForm);
router.post('/',          isAuthenticated, isAdmin, productValidators, productsController.create);

// Rutas con parámetro :id después
router.get('/:id',        productsController.detail);
router.get('/:id/edit',   isAuthenticated, isAdmin, productsController.editForm);
router.put('/:id',        isAuthenticated, isAdmin, productValidators, productsController.edit);
router.delete('/:id',     isAuthenticated, isAdmin, productsController.destroy);

module.exports = router;