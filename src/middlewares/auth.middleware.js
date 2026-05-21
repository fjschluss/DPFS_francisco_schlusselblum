const { User } = require('../../database/models');

// Middleware de aplicación: auto-login por cookie "recordarme"
const rememberMe = async (req, res, next) => {
    if (req.session.user) return next();

    const cookieEmail = req.cookies?.userEmail;
    if (!cookieEmail) return next();

    try {
        const user = await User.findOne({ where: { email: cookieEmail } });
        if (!user) return next();

        req.session.user = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
            category: user.category
        };
    } catch (err) {
        console.error('rememberMe error:', err);
    }

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

// Middleware: solo usuarios admin
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.category === 'admin') return next();
    res.status(403).render('error', {
        title: 'Acceso denegado',
        message: 'No tenés permisos para realizar esta acción.',
        session: req.session
    });
};

module.exports = { rememberMe, isAuthenticated, isGuest, isAdmin };