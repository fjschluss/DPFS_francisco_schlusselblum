const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/products.json");

const productController = {

    list: (req, res) => {
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );
        res.render('products/productList', { products });
    },

    detail: (req, res) => {

        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );

        const id = parseInt(req.params.id);

        const product = products.find(p => p.id === id);

        const relatedProducts = products
            .filter(p => p.id !== product.id)
            .slice(0, 3);

        res.render("products/productDetail", {
            product,
            relatedProducts
        });

    },

    create: (req, res) => {
        res.render('products/productCreate');
    },

    store: (req, res) => {

        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );

        const lastProduct = products[products.length - 1];

        const newProduct = {
            id: lastProduct ? lastProduct.id + 1 : 1,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            colors: req.body.colors.split(",").map(color => color.trim()),
            sizes: req.body.sizes.split(",").map(size => size.trim()),
            price: Number(req.body.price)
        };

        products.push(newProduct);

        fs.writeFileSync(
            productsFilePath,
            JSON.stringify(products, null, 2)
        );

        res.redirect("/products");

    },

    edit: (req, res) => {

        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );

        const product = products.find(
            p => p.id == req.params.id
        );

        if (!product) {
            return res.send("Producto no encontrado");
        }

        res.render("products/productEdit", { product });

    },

    update: (req, res) => {

        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );

        const productIndex = products.findIndex(
            p => p.id == req.params.id
        );

        if (productIndex === -1) {
            return res.send("Producto no encontrado");
        }

        products[productIndex] = {
            ...products[productIndex],
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            colors: req.body.colors.split(",").map(color => color.trim()),
            sizes: req.body.sizes.split(",").map(size => size.trim()),
            price: Number(req.body.price)
        };

        fs.writeFileSync(
            productsFilePath,
            JSON.stringify(products, null, 2)
        );

        res.redirect(`/products/${req.params.id}`);

    },

    destroy: (req, res) => {

        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );

        const filteredProducts = products.filter(
            p => p.id != req.params.id
        );

        fs.writeFileSync(
            productsFilePath,
            JSON.stringify(filteredProducts, null, 2)
        );

        res.redirect("/products");

    }

};

module.exports = productController;