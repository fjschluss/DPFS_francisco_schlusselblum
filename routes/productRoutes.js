const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const authMiddleware = require('../middlewares/authMiddleware');

// 🔍 SEARCH (SIEMPRE ARRIBA)
router.get('/search', productController.search);

// LISTADO
router.get('/', productController.list);

// CREATE
router.get('/create', authMiddleware, productsController.create);
router.post('/create', authMiddleware, productsController.store);

// DETAIL (SIEMPRE DESPUÉS)
router.get('/:id', productController.detail);

// EDIT
router.get('/:id/edit', authMiddleware, productsController.edit);
router.put('/:id', authMiddleware, productsController.update);

// DELETE
router.delete('/:id', authMiddleware, productsController.destroy);

module.exports = router;