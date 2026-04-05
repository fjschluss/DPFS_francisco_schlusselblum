const { body } = require("express-validator");

module.exports = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 5 }).withMessage("Mínimo 5 caracteres"),

    body("descripcion")
        .isLength({ min: 20 }).withMessage("Mínimo 20 caracteres"),

    body("precio")
        .notEmpty().withMessage("El precio es obligatorio")
        .isFloat({ min: 0 }).withMessage("Debe ser número válido"),

    body("imagen").custom((value, { req }) => {
        if (!req.file) return true;
        const allowed = ["image/jpeg", "image/png", "image/gif"];
        if (!allowed.includes(req.file.mimetype)) {
            throw new Error("Formato inválido");
        }
        return true;
    })
];