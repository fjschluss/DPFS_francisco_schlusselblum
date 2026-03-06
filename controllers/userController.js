const userController = {

    login: (req, res) => {
        res.render('users/login');
    },

    register: (req, res) => {
        res.render('users/register');
    },

    profile: (req, res) => {
        return res.render('users/profile');
    }

};

module.exports = userController;