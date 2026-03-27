const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const authMiddleware = require('../middlewares/authMiddleware');

// 🔍 SEARCH (SIEMPRE ARRIBA)
router.get('/search', productController.search);

// LISTADO
router.get('/', productController.list);

// CREATE
router.get('/create', authMiddleware, productController.create);
router.post('/create', authMiddleware, productController.store);

// DETAIL (SIEMPRE DESPUÉS)
router.get('/:id', productController.detail);

// EDIT
router.get('/:id/edit', authMiddleware, productController.edit);
router.put('/:id', authMiddleware, productController.update);

// DELETE
router.delete('/:id', authMiddleware, productController.destroy);

module.exports = router;