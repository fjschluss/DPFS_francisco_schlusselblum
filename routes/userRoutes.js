const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

const upload = require('../middlewares/multerUsers');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const userRegisterValidation = require("../validations/userRegisterValidation");

// Solo huéspedes
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', guestMiddleware, upload.single('image'), userRegisterValidation, usersController.store);

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', guestMiddleware, usersController.processLogin);

// Solo usuarios logueados
router.get('/profile', authMiddleware, usersController.profile);
router.post('/logout', authMiddleware, usersController.logout);

module.exports = router;