const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

function getUsers() {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
}

// Middleware de aplicación: auto-login por cookie "recordarme"
const rememberMe = (req, res, next) => {
    if (req.session.user) return next();

    const cookieEmail = req.cookies.userEmail;
    if (!cookieEmail) return next();

    const users = getUsers();
    const user = users.find(u => u.email === cookieEmail);
    if (!user) return next();

    req.session.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        category: user.category
    };

    next();
};

// Middleware de ruta: solo para usuarios autenticados
const isAuthenticated = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/users/login');
};

// Middleware de ruta: solo para huéspedes (sin login)
const isGuest = (req, res, next) => {
    if (!req.session.user) return next();
    res.redirect('/users/profile');
};

module.exports = { rememberMe, isAuthenticated, isGuest };