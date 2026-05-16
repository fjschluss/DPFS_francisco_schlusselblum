const { Product, Category } = require('../../database/models');

const mainController = {

    home: async (req, res) => {
        try {
            const featured = await Product.findAll({
                include: [{ model: Category, as: 'category' }],
                order: [['createdAt', 'DESC']],
                limit: 4
            });
            res.render('index', {
                title: 'LuBo – Recursos para Indumentaria',
                featuredProducts: featured,
                session: req.session
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('404', { title: 'Error', session: req.session });
        }
    },

    cart: (req, res) => res.render('cart', {
        title: 'Mi Carrito – LuBo',
        session: req.session
    }),
};

module.exports = mainController;