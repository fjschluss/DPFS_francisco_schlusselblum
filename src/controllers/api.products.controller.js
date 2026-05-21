const { Product, Category, Brand } = require('../../database/models');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const apiProductsController = {

    list: async (req, res) => {
        try {
            const PAGE_SIZE = 10;
            const page   = parseInt(req.query.page) || 1;
            const offset = (page - 1) * PAGE_SIZE;

            // countByCategory necesita el total completo (sin limit)
            const allProducts = await Product.findAll({
                include: [{ model: Category, as: 'category' }]
            });
            const countByCategory = {};
            allProducts.forEach(p => {
                const catName = p.category ? p.category.name : 'Sin categoría';
                countByCategory[catName] = (countByCategory[catName] || 0) + 1;
            });

            const { count, rows: products } = await Product.findAndCountAll({
                include: [
                    { model: Category, as: 'category' },
                    { model: Brand,    as: 'brand'    }
                ],
                order:    [['createdAt', 'DESC']],
                limit:    PAGE_SIZE,
                offset,
                distinct: true
            });

            const totalPages = Math.ceil(count / PAGE_SIZE);

            res.json({
                count,
                countByCategory,
                page,
                totalPages,
                next:     page < totalPages ? `${BASE_URL}/api/products?page=${page + 1}` : null,
                previous: page > 1         ? `${BASE_URL}/api/products?page=${page - 1}` : null,
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