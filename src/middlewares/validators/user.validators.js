// src/middlewares/validators/user.validators.js
const { body } = require('express-validator');

const registerValidators = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres.'),

    body('lastName')
        .trim()
        .notEmpty().withMessage('El apellido es obligatorio.')
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres.'),

    body('email')
        .trim()
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .isEmail().withMessage('El formato del correo no es válido.'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),

    body('password2')
        .notEmpty().withMessage('Repetí la contraseña.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden.');
            }
            return true;
        }),
];

const loginValidators = [
    body('email')
        .trim()
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .isEmail().withMessage('El formato del correo no es válido.'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.'),
];

module.exports = { registerValidators, loginValidators };