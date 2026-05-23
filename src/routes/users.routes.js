const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/users.controller');
const { isGuest, isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');
const { registerValidators, loginValidators } = require('../middlewares/validators/user.validators');

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
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Solo JPG, PNG, WEBP o GIF'), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

// Rutas de huéspedes
router.get('/login', isGuest, usersController.loginForm);
router.post('/login', isGuest, loginValidators, usersController.login);

router.get('/register', isGuest, usersController.registerForm);
router.post('/register', isGuest, upload.single('image'), registerValidators, usersController.register);

// Rutas de usuarios autenticados
router.get('/profile', isAuthenticated, usersController.profile);
router.post('/logout', isAuthenticated, usersController.logout);

// Rutas de admin
router.get('/admin', isAuthenticated, isAdmin, usersController.adminList);
router.put('/:id/role', isAuthenticated, isAdmin, usersController.toggleRole);
router.delete('/:id', isAuthenticated, isAdmin, usersController.destroyUser);

module.exports = router;