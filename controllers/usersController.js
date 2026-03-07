const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');

const usersController = {

    register: (req, res) => {
        res.render('users/register');
    },

    processRegister: (req, res) => {

        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let userExists = users.find(user => user.email === req.body.email);

        if (userExists) {
            return res.send("El email ya está registrado");
        }

        let passwordHash = bcrypt.hashSync(req.body.password, 10);

        let newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: passwordHash,
            image: req.file ? req.file.filename : 'default.png'
        };

        users.push(newUser);

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));

        res.redirect('/users/login');
    },

    login: (req, res) => {
        res.render('users/login');
    },

    processLogin: (req, res) => {

        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let userToLogin = users.find(user => user.email === req.body.email);

        if (userToLogin) {

            let passwordOk = bcrypt.compareSync(req.body.password, userToLogin.password);

            if (passwordOk) {

                req.session.userLogged = {
                    id: userToLogin.id,
                    firstName: userToLogin.firstName,
                    lastName: userToLogin.lastName,
                    email: userToLogin.email,
                    image: userToLogin.image
                };

                if (req.body.remember) {
                    res.cookie('userEmail', userToLogin.email, {
                        maxAge: 1000 * 60 * 60 * 24
                    });
                }

                return res.redirect('/users/profile');
            }

            return res.send("Contraseña incorrecta");
        }

        return res.send("Usuario no encontrado");
    },

    profile: (req, res) => {
        return res.render('users/profile', {
            user: req.session.userLogged
        });
    },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.clearCookie('userEmail'); // cookie de "recordarme"
            return res.redirect('/');
        });
    }

};

module.exports = usersController;