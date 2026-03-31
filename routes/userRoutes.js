const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

const upload = require('../middlewares/multerUsers');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

const userRegisterValidation = require('../validations/userRegisterValidation');
const userLoginValidation = require('../validations/userLoginValidation');

// REGISTER
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', guestMiddleware, upload.single('image'), userRegisterValidation, usersController.store);

// LOGIN
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', guestMiddleware, userLoginValidation, usersController.processLogin);

// PROFILE
router.get('/profile', authMiddleware, usersController.profile);

// LOGOUT
router.post('/logout', authMiddleware, usersController.logout);

module.exports = router;