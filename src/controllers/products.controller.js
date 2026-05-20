const { Product, Category, Brand } = require('../../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const productsController = {

    list: async (req, res) => {
        try {
            const { category, search } = req.query;
            const where = {};

            if (search) {
                where.name = { [Op.like]: `%${search}%` };
            }

            if (category) {
                const cat = await Category.findOne({ where: { name: category } });
                if (cat) where.categoryId = cat.id;
            }

            const [products, categories] = await Promise.all([
                Product.findAll({
                    where,
                    include: [
                        { model: Category, as: 'category' },
                        { model: Brand,    as: 'brand'    },
                    ],
                    order: [['createdAt', 'DESC']]
                }),
                Category.findAll()
            ]);

            res.render('products/list', {
                title:            'Productos – LuBo',
                products,
                categories,
                selectedCategory: category || null,
                search:           search || '',
                session:          req.session
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('404', { title: 'Error', session: req.session });
        }
    },

    detail: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id, {
                include: [
                    { model: Category, as: 'category' },
                    { model: Brand,    as: 'brand'    },
                ]
            });
            if (!product) return res.status(404).render('404', { title: 'Producto no encontrado', session: req.session });
            res.render('products/detail', {
                title:   `${product.name} – LuBo`,
                product,
                session: req.session
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('404', { title: 'Error', session: req.session });
        }
    },

    createForm: async (req, res) => {
        try {
            const [categories, brands] = await Promise.all([
                Category.findAll(),
                Brand.findAll()
            ]);
            res.render('products/create', {
                title:      'Nuevo Producto – LuBo',
                categories,
                brands,
                errors:     [],
                old:        {},
                session:    req.session
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('404', { title: 'Error', session: req.session });
        }
    },

    create: async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            const [categories, brands] = await Promise.all([
                Category.findAll(),
                Brand.findAll()
            ]);
            return res.render('products/create', {
                title:      'Nuevo Producto – LuBo',
                categories,
                brands,
                errors:     result.array().map(e => e.msg),
                old:        req.body,
                session:    req.session
            });
        }

        try {
            const { name, description, image, categoryId, brandId, price } = req.body;
            await Product.create({
                name,
                description,
                image:      image || '/images/placeholder.jpg',
                categoryId: parseInt(categoryId),
                brandId:    parseInt(brandId),
                price:      parseFloat(price),
            });
            res.redirect('/products');
        } catch (err) {
            console.error(err);
            res.status(500).render('404', { title: 'Error al crear', session: req.session });
        }
    },

    editForm: async (req, res) => {
        try {
            const [product, categories, brands] = await Promise.all([
                Product.findByPk(req.params.id),
                Category.findAll(),
                Brand.findAll()
            ]);
            if (!product) return res.status(404).render('404', { title: 'Producto no encontrado', session: req.session });
            res.render('products/edit', {
                title:      `Editar: ${product.name} – LuBo`,
                product,
                categories,
                brands,
                errors:     [],
                old:        {},
                session:    req.session
            });
        } catch (err) {
            console.error(err);
            res.status(500).render('404', { title: 'Error', session: req.session });
        }
    },

    edit: async (req, res) => {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            const [product, categories, brands] = await Promise.all([
                Product.findByPk(req.params.id),
                Category.findAll(),
                Brand.findAll()
            ]);
            return res.render('products/edit', {
                title:      `Editar: ${product ? product.name : 'Producto'} – LuBo`,
                product,
                categories,
                brands,
                errors:     result.array().map(e => e.msg),
                old:        req.body,
                session:    req.session
            });
        }

        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) return res.status(404).render('404', { title: 'Producto no encontrado', session: req.session });
            const { name, description, image, categoryId, brandId, price } = req.body;
            await product.update({
                name,
                description,
                image:      image || product.image,
                categoryId: parseInt(categoryId),
                brandId:    parseInt(brandId),
                price:      parseFloat(price),
            });
            res.redirect(`/products/${product.id}`);
        } catch (err) {
            console.error(err);
            res.status(500).render('404', { title: 'Error al editar', session: req.session });
        }
    },

    destroy: async (req, res) => {
        try {
            const product = await Product.findByPk(req.params.id);
            if (product) await product.destroy();
            res.redirect('/products');
        } catch (err) {
            console.error(err);
            res.status(500).render('404', { title: 'Error al eliminar', session: req.session });
        }
    }
};

module.exports = productsController;