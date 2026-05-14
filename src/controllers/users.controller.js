const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');

function getUsers() {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
}

function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4), 'utf-8');
}

const usersController = {

    // ── Registro ──────────────────────────────────────────
    registerForm: (req, res) => {
        res.render('users/register', { title: 'Crear Cuenta – LuBo', errors: [], old: {} });
    },

    register: async (req, res) => {
        const { firstName, lastName, email, password, password2 } = req.body;
        const users = getUsers();
        const errors = [];

        if (!firstName || !lastName || !email || !password || !password2) {
            errors.push('Todos los campos son obligatorios.');
        }
        if (password !== password2) {
            errors.push('Las contraseñas no coinciden.');
        }
        if (password && password.length < 8) {
            errors.push('La contraseña debe tener al menos 8 caracteres.');
        }
        if (users.find(u => u.email === email)) {
            errors.push('Ya existe una cuenta con ese correo electrónico.');
        }

        if (errors.length > 0) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.render('users/register', {
                title: 'Crear Cuenta – LuBo',
                errors,
                old: req.body
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const image = req.file
            ? `/images/users/${req.file.filename}`
            : '/images/users/default.jpg';

        const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
        const newUser = {
            id: maxId + 1,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            category: 'cliente',
            image
        };

        users.push(newUser);
        saveUsers(users);

        req.session.user = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            image: newUser.image,
            category: newUser.category
        };

        res.redirect('/users/profile');
    },

    // ── Login ─────────────────────────────────────────────
    loginForm: (req, res) => {
        res.render('users/login', { title: 'Iniciar Sesión – LuBo', error: null });
    },

    login: async (req, res) => {
        const { email, password, remember } = req.body;
        const users = getUsers();

        const user = users.find(u => u.email === email);
        if (!user) {
            return res.render('users/login', {
                title: 'Iniciar Sesión – LuBo',
                error: 'El correo o la contraseña son incorrectos.'
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.render('users/login', {
                title: 'Iniciar Sesión – LuBo',
                error: 'El correo o la contraseña son incorrectos.'
            });
        }

        req.session.user = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
            category: user.category
        };

        if (remember) {
            res.cookie('userEmail', email, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            });
        }

        res.redirect('/users/profile');
    },

    // ── Perfil ────────────────────────────────────────────
    profile: (req, res) => {
        res.render('users/profile', {
            title: 'Mi Perfil – LuBo',
            user: req.session.user,
            session: req.session
        });
    },

    // ── Logout ────────────────────────────────────────────
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('userEmail');
        res.redirect('/');
    }
};

module.exports = usersController;