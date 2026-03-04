const products = [
    {
        id: 1,
        name: "Remera Oversize",
        description: "Remera urbana minimalista",
        image: "remera.jpg",
        category: "Remeras",
        colors: "Negro, Blanco",
        price: 15000
    },
    {
        id: 2,
        name: "Buzo Hoodie",
        description: "Buzo con capucha estilo urbano",
        image: "buzo.jpg",
        category: "Buzos",
        colors: "Gris, Negro",
        price: 25000
    }
];

const productController = {

    list: (req, res) => {
        res.render('products/productList', { products });
    },

    detail: (req, res) => {
        const id = parseInt(req.params.id);
        const product = products.find(p => p.id === id);
        res.render('products/productDetail', { product });
    },

    create: (req, res) => {
        res.render('products/productCreate');
    },

    edit: (req, res) => {
        const id = parseInt(req.params.id);
        const product = products.find(p => p.id === id);
        res.render('products/productEdit', { product });
    }

};

module.exports = productController;