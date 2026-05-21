const { Product, Category, Brand } = require('../../database/models');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const apiProductsController = {

    list: async (req, res) => {
        try {
            const products = await Product.findAll({
                include: [
                    { model: Category, as: 'category' },
                    { model: Brand,    as: 'brand'    }
                ],
                order: [['createdAt', 'DESC']]
            });

            // countByCategory: { 'Fichas Técnicas': 5, 'Moldes': 3, ... }
            const countByCategory = {};
            products.forEach(p => {
                const catName = p.category ? p.category.name : 'Sin categoría';
                countByCategory[catName] = (countByCategory[catName] || 0) + 1;
            });

            res.json({
                count: products.length,
                countByCategory,
                products: products.map(p => ({
                    id:          p.id,
                    name:        p.name,
                    description: p.description,
                    categories:  p.category ? [p.category.name] : [],
                    detail:      `${BASE_URL}/api/products/${p.id}`
                }))
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    detail: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id, {
                include: [
                    { model: Category, as: 'category' },
                    { model: Brand,    as: 'brand'    }
                ]
            });
            if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
            res.json({
                id:          product.id,
                name:        product.name,
                description: product.description,
                price:       Number(product.price),
                imageUrl:    `${BASE_URL}${product.image}`,
                categories:  product.category ? [product.category.name] : [],
                brand:       product.brand    ? product.brand.name    : null,
                createdAt:   product.createdAt,
                updatedAt:   product.updatedAt
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = apiProductsController;