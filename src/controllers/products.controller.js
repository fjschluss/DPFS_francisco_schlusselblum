const products = require('../../data/products');

const productsController = {
    list: (req, res) => {
        const { category } = req.query;
        let filtered = products;
        if (category) {
            filtered = products.filter(p => p.category === category);
        }
        const categories = [...new Set(products.map(p => p.category))];
        res.render('products/list', {
            title: 'Productos – LuBo',
            products: filtered,
            categories,
            selectedCategory: category || null
        });
    },

    detail: (req, res) => {
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) return res.status(404).render('404', { title: 'Producto no encontrado' });
        res.render('products/detail', {
            title: `${product.name} – LuBo`,
            product
        });
    },

    createForm: (req, res) => {
        res.render('products/create', {
            title: 'Nuevo Producto – LuBo'
        });
    },

    create: (req, res) => {
        const { name, description, image, category, colors, price } = req.body;
        const newProduct = {
            id: products.length + 1,
            name,
            description,
            image: image || '/images/placeholder.jpg',
            category,
            price: parseFloat(price),
            colors: colors ? colors.split(',').map(c => c.trim()) : []
        };
        products.push(newProduct);
        res.redirect('/products');
    },

    editForm: (req, res) => {
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) return res.status(404).render('404', { title: 'Producto no encontrado' });
        res.render('products/edit', {
            title: `Editar: ${product.name} – LuBo`,
            product
        });
    },

    edit: (req, res) => {
        const index = products.findIndex(p => p.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).render('404', { title: 'Producto no encontrado' });
        const { name, description, image, category, colors, price } = req.body;
        products[index] = {
            ...products[index],
            name,
            description,
            image: image || products[index].image,
            category,
            price: parseFloat(price),
            colors: colors ? colors.split(',').map(c => c.trim()) : []
        };
        res.redirect(`/products/${products[index].id}`);
    }
};

module.exports = productsController;