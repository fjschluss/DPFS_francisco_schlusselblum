const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../database/models");

module.exports = [

  body("email")
    .notEmpty().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debe ser válido")
    .custom(async (value, { req }) => {

      const user = await db.Usuario.findOne({ where: { email: value } });

      if (!user) {
        throw new Error("Este email no está registrado");
      }

      req.userFound = user;
      return true;
    }),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .custom((value, { req }) => {

      const user = req.userFound;

      if (!user) return true;

      const valid = bcrypt.compareSync(value, user.password);

      if (!valid) {
        throw new Error("Contraseña incorrecta");
      }

      return true;
    })
    
];