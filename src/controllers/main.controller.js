const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const mainController = {
    home: (req, res) => {
        const data = fs.readFileSync(productsFilePath, 'utf-8');
        const products = JSON.parse(data);
        const featured = products.slice(0, 4);
        res.render('index', {
            title: 'LuBo – Recursos para Indumentaria',
            featuredProducts: featured,
            session: req.session
        });
    },
    cart: (req, res) => res.render('cart', {
        title: 'Mi Carrito – LuBo',
        session: req.session
    }),
};

module.exports = mainController;