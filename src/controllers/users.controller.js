const usersController = {
    loginForm:    (req, res) => res.render('users/login',    { title: 'Iniciar Sesión – LuBo' }),
    login:        (req, res) => {
        console.log('Datos de login recibidos:', req.body);
        res.redirect('/');
    },
    registerForm: (req, res) => res.render('users/register', { title: 'Crear Cuenta – LuBo' }),
    register:     (req, res) => {
        console.log('Datos de registro recibidos:', req.body);
        res.redirect('/');
    },
};

module.exports = usersController;