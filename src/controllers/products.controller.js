const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

function getProducts() {
    const data = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(data);
}

function saveProducts(products) {
    const data = JSON.stringify(products, null, 4);
    fs.writeFileSync(productsFilePath, data, 'utf-8');
}

const productsController = {
    list: (req, res) => {
        const products = getProducts();
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
            selectedCategory: category || null,
            session: req.session
        });
    },

    detail: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) return res.status(404).render('404', { title: 'Producto no encontrado', session: req.session });
        res.render('products/detail', {
            title: `${product.name} – LuBo`,
            product,
            session: req.session
        });
    },

    createForm: (req, res) => {
        res.render('products/create', {
            title: 'Nuevo Producto – LuBo',
            session: req.session
        });
    },

    create: (req, res) => {
        const products = getProducts();
        const { name, description, image, category, colors, sizes, price } = req.body;
        const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
        const newProduct = {
            id: maxId + 1,
            name,
            description,
            image: image || '/images/placeholder.jpg',
            category,
            price: parseFloat(price),
            colors: colors ? colors.split(',').map(c => c.trim()) : [],
            sizes: sizes ? sizes.split(',').map(s => s.trim()) : []
        };
        products.push(newProduct);
        saveProducts(products);
        res.redirect('/products');
    },

    editForm: (req, res) => {
        const products = getProducts();
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) return res.status(404).render('404', { title: 'Producto no encontrado', session: req.session });
        res.render('products/edit', {
            title: `Editar: ${product.name} – LuBo`,
            product,
            session: req.session
        });
    },

    edit: (req, res) => {
        const products = getProducts();
        const index = products.findIndex(p => p.id === parseInt(req.params.id));
        if (index === -1) return res.status(404).render('404', { title: 'Producto no encontrado', session: req.session });
        const { name, description, image, category, colors, sizes, price } = req.body;
        products[index] = {
            ...products[index],
            name,
            description,
            image: image || products[index].image,
            category,
            price: parseFloat(price),
            colors: colors ? colors.split(',').map(c => c.trim()) : [],
            sizes: sizes ? sizes.split(',').map(s => s.trim()) : []
        };
        saveProducts(products);
        res.redirect(`/products/${products[index].id}`);
    },

    destroy: (req, res) => {
        let products = getProducts();
        const id = parseInt(req.params.id);
        products = products.filter(p => p.id !== id);
        saveProducts(products);
        res.redirect('/products');
    }
};

module.exports = productsController;