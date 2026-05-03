const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/login', usersController.loginForm);
router.post('/login', usersController.login);
router.get('/register', usersController.registerForm);
router.post('/register', usersController.register);

module.exports = router;
