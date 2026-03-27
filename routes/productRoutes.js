const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// 🔍 SEARCH (SIEMPRE ARRIBA)
router.get('/search', productController.search);

// LISTADO
router.get('/', productController.list);

// CREATE
router.get('/create', productController.create);
router.post('/', productController.store);

// DETAIL (SIEMPRE DESPUÉS)
router.get('/:id', productController.detail);

// EDIT
router.get('/:id/edit', productController.edit);
router.put('/:id', productController.update);

// DELETE
router.delete('/:id', productController.destroy);

module.exports = router;