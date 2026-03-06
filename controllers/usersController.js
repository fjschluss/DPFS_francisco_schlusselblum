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

    profile: (req, res) => {
        return res.render('users/profile');
    }

};

module.exports = usersController;