const usersController = {
    loginForm:    (req, res) => res.render('users/login',    { title: 'Iniciar Sesión – LuBo' }),
    login:        (req, res) => res.redirect('/'),
    registerForm: (req, res) => res.render('users/register', { title: 'Crear Cuenta – LuBo' }),
    register:     (req, res) => res.redirect('/'),
};

module.exports = usersController;