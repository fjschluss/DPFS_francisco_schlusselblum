const db = require('../database/models');
const Usuario = db.Usuario;

const userLoggedMiddleware = async (req, res, next) => {

    res.locals.userLogged = false;

    if (req.session && req.session.userLogged) {
        res.locals.userLogged = req.session.userLogged;
        return next();
    }

    if (req.cookies && req.cookies.userEmail) {

        try {
            const user = await Usuario.findOne({
                where: { email: req.cookies.userEmail }
            });

            if (user) {
                req.session.userLogged = user;
                res.locals.userLogged = user;
            }

        } catch (error) {
            console.log(error);
        }
    }

    next();
};

module.exports = userLoggedMiddleware;