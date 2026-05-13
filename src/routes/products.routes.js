const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/', productsController.list);
router.get('/create', productsController.createForm);
router.post('/', productsController.create);
router.get('/:id/edit', productsController.editForm);
router.put('/:id', productsController.edit);
router.delete('/:id', productsController.destroy);
router.get('/:id', productsController.detail);

module.exports = router;