const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/users.controller');

// Configuración de Multer
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

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Rutas (middlewares de protección se agregan en Issue #79)
router.get('/login',     usersController.loginForm);
router.post('/login',    usersController.login);
router.get('/register',  usersController.registerForm);
router.post('/register', upload.single('image'), usersController.register);
router.get('/profile',   usersController.profile);
router.post('/logout',   usersController.logout);

module.exports = router;