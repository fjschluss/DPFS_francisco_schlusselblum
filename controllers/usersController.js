const db = require('../database/models');
const Usuario = db.Usuario;
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");

const usersController = {

    // 🟢 LISTAR USUARIOS (opcional)
    list: async (req, res) => {
        try {
            const users = await Usuario.findAll();

            res.render("users/userList", { users });

        } catch (error) {
            console.log(error);
        }
    },

    // 🟢 DETALLE
    detail: async (req, res) => {
        try {
            const user = await Usuario.findByPk(req.params.id);

            res.render("users/userDetail", { user });

        } catch (error) {
            console.log(error);
        }
    },

    // 🟢 REGISTER VIEW
    register: (req, res) => {
        res.render("users/register", { errors: {}, oldData: {} });
    },

    // 🟢 CREAR USUARIO
    store: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (req.fileValidationError) {
                return res.render("users/register", {
                    errors: {
                        image: { msg: req.fileValidationError }
                    },
                    oldData: req.body
                });
            }

            if (!errors.isEmpty()) {
                return res.render("users/register", {
                    errors: errors.mapped(),
                    oldData: req.body
                });
            }

            await Usuario.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email.trim(),
                password: bcrypt.hashSync(req.body.password, 10),
                role: "user",
                avatar: req.file ? req.file.filename : "default-user.png"
            });

            res.redirect("/users/login");

        } catch (error) {
            console.log(error);
        }
    },

    // 🟢 LOGIN VIEW
    login: (req, res) => {
        res.render("users/login", { errors: {}, oldData: {} });
    },

    // 🟢 PROCESAR LOGIN
    processLogin: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.render("users/login", {
                    errors: errors.mapped(),
                    oldData: req.body
                });
            }

            const user = await Usuario.findOne({
                where: { email: req.body.email }
            });

            const isValidPassword = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!isValidPassword) {
                return res.render("users/login", {
                    errors: {
                        password: { msg: "La contraseña es incorrecta" }
                    },
                    oldData: req.body
                });
            }

            req.session.userLogged = user;

            if (req.body.remember) {
                res.cookie("userEmail", user.email, {
                    maxAge: 1000 * 60 * 60 * 24 * 7
                });
            }

            res.redirect("/users/profile");

        } catch (error) {
            console.log(error);
        }
    },

    // 🟢 PROFILE
    profile: (req, res) => {
        res.render("users/profile", {
            usuario: req.session.userLogged
        });
    },

    // 🟢 EDIT
    edit: async (req, res) => {
        try {
            const user = await Usuario.findByPk(req.params.id);

            res.render("users/userEdit", { user });

        } catch (error) {
            console.log(error);
        }
    },

    // 🟢 UPDATE
    update: async (req, res) => {
        try {
            await Usuario.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email
            }, {
                where: { id_usuarios: req.params.id }
            });

            res.redirect("/users/" + req.params.id);

        } catch (error) {
            console.log(error);
        }
    },

    // 🟢 LOGOUT
    logout: (req, res) => {
        res.clearCookie("userEmail");
        req.session.destroy();
        res.redirect("/");
    }

};

module.exports = usersController;