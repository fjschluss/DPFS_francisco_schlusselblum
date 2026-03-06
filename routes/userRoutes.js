const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

const upload = require('../middlewares/multerUsers');

router.get('/register', usersController.register);
router.post('/register', upload.single('image'), usersController.processRegister);

router.get('/login', usersController.login);
router.post('/login', usersController.processLogin);

router.get('/profile', usersController.profile);

module.exports = router;