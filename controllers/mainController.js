const mainController = {

    home: (req, res) => {
        res.render('home');
    },

    cart: (req, res) => {
        res.render('cart');
    }

};

module.exports = mainController;