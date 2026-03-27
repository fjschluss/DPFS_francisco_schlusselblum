const { body } = require("express-validator");
const db = require("../database/models");

module.exports = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),

    body("apellido")
        .notEmpty().withMessage("El apellido es obligatorio")
        .isLength({ min: 2 }).withMessage("Debe tener al menos 2 caracteres"),

    body("email")
        .notEmpty().withMessage("El email es obligatorio")
        .isEmail().withMessage("Debe ser un email válido")
        .custom(async (value) => {
            const user = await db.Usuario.findOne({ where: { email: value } });
            if (user) {
                throw new Error("El email ya está registrado");
            }
            return true;
        }),

    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 8 }).withMessage("Debe tener al menos 8 caracteres"),

    body("image").custom((value, { req }) => {
        if (!req.file) return true;
        const allowed = ["image/jpeg", "image/png", "image/gif"];
        if (!allowed.includes(req.file.mimetype)) {
            throw new Error("Formato de imagen inválido");
        }
        return true;
    })
];