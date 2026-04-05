const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerProducts');
const productValidation = require('../validations/productValidation');

// SEARCH
router.get('/search', productController.search);

// LIST
router.get('/', productController.list);

// CREATE
router.get('/create', authMiddleware, productController.create);
router.post('/create', authMiddleware, upload.single('imagen'), productValidation, productController.store);

// DETAIL
router.get('/:id', productController.detail);

// EDIT
router.get('/:id/edit', authMiddleware, productController.edit);
router.put('/:id', authMiddleware, upload.single('imagen'), productValidation, productController.update);

// DELETE
router.delete('/:id', authMiddleware, productController.destroy);

module.exports = router;