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

    edit: (req, res) => {
        const products = JSON.parse(
            fs.readFileSync(productsFilePath, "utf-8")
        );
        const id = parseInt(req.params.id);
        const product = products.find(p => p.id === id);
        res.render('products/productEdit', { product });
    }

};

module.exports = productController;