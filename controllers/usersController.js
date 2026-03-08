const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');

const readUsers = () => {
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const usersController = {
  register: (req, res) => {
    res.render('users/register', { errors: {}, oldData: {} });
  },

  processRegister: (req, res) => {
    const users = readUsers();

    const userInDb = users.find(user => user.email === req.body.email);

    if (userInDb) {
      return res.render('users/register', {
        errors: {
          email: { msg: 'El email ya está registrado' }
        },
        oldData: req.body
      });
    }

    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      password: bcrypt.hashSync(req.body.password, 10),
      image: req.file ? req.file.filename : 'default-user.png'
    };

    users.push(newUser);
    writeUsers(users);

    return res.redirect('/users/login');
  },

  login: (req, res) => {
    res.render('users/login', { errors: {}, oldData: {} });
  },

  processLogin: (req, res) => {
    const users = readUsers();

    const userToLogin = users.find(user => user.email === req.body.email);

    if (!userToLogin) {
      return res.render('users/login', {
        errors: {
          email: { msg: 'No existe un usuario con ese email' }
        },
        oldData: req.body
      });
    }

    const isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);

    if (!isOkPassword) {
      return res.render('users/login', {
        errors: {
          password: { msg: 'La contraseña es incorrecta' }
        },
        oldData: req.body
      });
    }

    req.session.userLogged = userToLogin;

    if (req.body.remember) {
      res.cookie('userEmail', userToLogin.email, { maxAge: 1000 * 60 * 60 * 24 * 7 });
    }

    return res.redirect('/users/profile');
  },

  profile: (req, res) => {
    return res.render('users/profile', { user: req.session.userLogged });
  },

  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/');
  }
};

module.exports = usersController;