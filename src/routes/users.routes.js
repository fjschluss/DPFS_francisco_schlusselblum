const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/users.controller');
const { isGuest, isAuthenticated } = require('../middlewares/auth.middleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `user-${Date.now()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Solo JPG, PNG o WEBP'), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

// Rutas de huéspedes
router.get('/login', isGuest, usersController.loginForm);
router.post('/login', isGuest, usersController.login);
router.get('/register', isGuest, usersController.registerForm);
router.post('/register', isGuest, upload.single('image'), usersController.register);

// Rutas de usuarios
router.get('/profile', isAuthenticated, usersController.profile);
router.post('/logout', isAuthenticated, usersController.logout);

module.exports = router;