const mainController = {
    home: (req, res) => res.render('index', {title:'LuBo – Recursos para Indumentaria'}),
    cart: (req, res) => res.render('cart',  { title:'Mi Carrito – LuBo'}),
};

module.exports = mainController;