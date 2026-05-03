const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/', productsController.list);
router.get('/create', productsController.createForm);
router.post('/create', productsController.create);
router.get('/:id/edit', productsController.editForm);
router.post('/:id/edit', productsController.edit);
router.get('/:id', productsController.detail);

module.exports = router;