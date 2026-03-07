const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

const upload = require('../middlewares/multerUsers');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// Solo huéspedes
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', guestMiddleware, upload.single('image'), usersController.processRegister);

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', guestMiddleware, usersController.processLogin);

// Solo usuarios logueados
router.get('/profile', authMiddleware, usersController.profile);
router.post('/logout', usersController.logout);

module.exports = router;