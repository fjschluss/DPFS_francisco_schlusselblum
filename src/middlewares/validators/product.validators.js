const { body } = require('express-validator');

const ALLOWED_IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif)$/i;

const productValidators = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre del producto es obligatorio.')
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres.'),

    body('description')
        .trim()
        .notEmpty().withMessage('La descripción es obligatoria.')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.'),

    body('price')
        .notEmpty().withMessage('El precio es obligatorio.')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número válido mayor o igual a 0.'),

    body('categoryId')
        .notEmpty().withMessage('Seleccioná una categoría.'),

    body('brandId')
        .notEmpty().withMessage('Seleccioná una marca.'),

    body('image')
        .optional({ checkFalsy: true })
        .custom((value) => {
            if (value && !ALLOWED_IMAGE_EXTENSIONS.test(value)) {
                throw new Error('La imagen debe ser JPG, JPEG, PNG o GIF.');
            }
            return true;
        }),
];

module.exports = { productValidators };