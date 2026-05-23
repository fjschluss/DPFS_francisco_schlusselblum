// src/controllers/users.controller.js
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { User } = require('../../database/models');

const usersController = {

    // ── Registro ──────────────────────────────────────────
    registerForm: (req, res) => {
        res.render('users/register', { title: 'Crear Cuenta – LuBo', errors: [], old: {} });
    },

    register: async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            if (req.file) require('fs').unlinkSync(req.file.path);
            return res.render('users/register', {
                title:  'Crear Cuenta – LuBo',
                errors: result.array().map(e => e.msg),
                old:    req.body
            });
        }

        const { firstName, lastName, email, password } = req.body;

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            if (req.file) require('fs').unlinkSync(req.file.path);
            return res.render('users/register', {
                title:  'Crear Cuenta – LuBo',
                errors: ['Ya existe una cuenta con ese correo electrónico.'],
                old:    req.body
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const image = req.file
            ? `/images/users/${req.file.filename}`
            : '/images/users/default.jpg';

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            category: 'cliente',
            image
        });

        req.session.user = {
            id:        newUser.id,
            firstName: newUser.firstName,
            lastName:  newUser.lastName,
            email:     newUser.email,
            image:     newUser.image,
            category:  newUser.category
        };

        res.redirect('/users/profile');
    },

    // ── Login ─────────────────────────────────────────────
    loginForm: (req, res) => {
        res.render('users/login', { title: 'Iniciar Sesión – LuBo', errors: [] });
    },

    login: async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.render('users/login', {
                title:  'Iniciar Sesión – LuBo',
                errors: result.array().map(e => e.msg)
            });
        }

        const { email, password, remember } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.render('users/login', {
                title:  'Iniciar Sesión – LuBo',
                errors: ['El correo o la contraseña son incorrectos.']
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.render('users/login', {
                title:  'Iniciar Sesión – LuBo',
                errors: ['El correo o la contraseña son incorrectos.']
            });
        }

        req.session.user = {
            id:        user.id,
            firstName: user.firstName,
            lastName:  user.lastName,
            email:     user.email,
            image:     user.image,
            category:  user.category
        };

        if (remember) {
            res.cookie('userEmail', email, {
                maxAge:   1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            });
        }

        res.redirect('/users/profile');
    },

    // ── Perfil ────────────────────────────────────────────
    profile: (req, res) => {
        res.render('users/profile', {
            title:   'Mi Perfil – LuBo',
            user:    req.session.user,
            session: req.session
        });
    },

    // ── Logout ────────────────────────────────────────────
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('userEmail');
        res.redirect('/');
    },

    // ── Admin: listado de usuarios ─────────────────────
    adminList: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'image', 'category', 'createdAt'],
                order: [['createdAt', 'DESC']]
            });
            res.render('users/admin', {
                title:   'Gestión de Usuarios – LuBo',
                users,
                session: req.session
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('error', {
                title:   'Error del servidor',
                message: 'No se pudo cargar el listado de usuarios.',
                session: req.session
            });
        }
    },

    // ── Admin: cambiar rol de usuario ──────────────────
    toggleRole: async (req, res) => {
        try {
            const userId = parseInt(req.params.id);
            if (userId === req.session.user.id) {
                return res.status(403).render('error', {
                    title:   'Acción no permitida',
                    message: 'No podés cambiar tu propio rol.',
                    session: req.session
                });
            }
            const user = await User.findByPk(userId);
            if (!user) return res.status(404).render('404', { title: 'Usuario no encontrado', session: req.session });
            const newRole = user.category === 'admin' ? 'cliente' : 'admin';
            await user.update({ category: newRole });
            res.redirect('/users/admin');
        } catch (err) {
            console.error(err);
            res.status(500).render('error', {
                title:   'Error del servidor',
                message: 'No se pudo actualizar el rol.',
                session: req.session
            });
        }
    },

    // ── Admin: eliminar usuario ─────────────────────────
    destroyUser: async (req, res) => {
        try {
            const userId = parseInt(req.params.id);
            if (userId === req.session.user.id) {
                return res.status(403).render('error', {
                    title:   'Acción no permitida',
                    message: 'No podés eliminarte a vos mismo.',
                    session: req.session
                });
            }
            const user = await User.findByPk(userId);
            if (user) await user.destroy();
            res.redirect('/users/admin');
        } catch (err) {
            console.error(err);
            res.status(500).render('error', {
                title:   'Error del servidor',
                message: 'No se pudo eliminar el usuario.',
                session: req.session
            });
        }
    }
};

module.exports = usersController;