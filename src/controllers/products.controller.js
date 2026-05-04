const products = require('../../data/products');

const productsController = {
    list:       (req, res) => res.render('products/list',   { title: 'Productos – LuBo', products }),
    detail:     (req, res) => {
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) return res.status(404).render('404', { title: 'No encontrado' });
        res.render('products/detail', { title: `${product.name} – LuBo`, product });
    },
    createForm: (req, res) => res.render('products/create', { title: 'Nuevo Producto – LuBo' }),
    create:     (req, res) => res.redirect('/products'),
    editForm:   (req, res) => {
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) return res.status(404).render('404', { title: 'No encontrado' });
        res.render('products/edit', { title: `Editar: ${product.name}`, product });
    },
    edit:       (req, res) => res.redirect('/products'),
};

module.exports = productsController;