const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get('/register', userController.register);
router.get('/login', usesController.login);
router.get('/profile', userController.profile);

module.exports = router;