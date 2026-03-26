const db = require('../database/models');
const Producto = db.Producto;
const Categoria = db.Categoria;
const Brand = db.Brand;

const productController = {

    // 🟢 LISTADO
    list: async (req, res) => {
        try {
            const productos = await db.Producto.findAll({
                include: ['categoria', 'brand']
            });

            res.render('products/productList', { productos });

        } catch (error) {
            console.log(error);
            res.send('Error al cargar productos');
        }
    },

    // 🟢 DETALLE
    detail: async (req, res) => {
        try {
            const producto = await db.Producto.findByPk(req.params.id, {
                include: ['categoria', 'brand']
            });

            const relacionados = await db.Producto.findAll({
                where: {
                    id_productos: {
                        [db.Sequelize.Op.ne]: req.params.id
                    }
                },
                limit: 3
            });

            res.render('products/productDetail', {
                producto,
                relacionados
            });

        } catch (error) {
            console.log(error);
            res.send('Error en detalle');
        }
    },

    // 🟢 FORM CREATE
    create: async (req, res) => {
        try {
            const categorias = await db.Categoria.findAll();
            const brands = await db.Brand.findAll();

            res.render('products/productCreate', {
                categorias,
                brands
            });

        } catch (error) {
            console.log(error);
        }
    },

    // 🟢 GUARDAR
    store: async (req, res) => {
        try {
            await db.Producto.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                imagen: req.file ? req.file.filename : "default.png",
                id_categorias: req.body.categoria,
                id_brands: req.body.brand
            });

            res.redirect('/products');

        } catch (error) {
            console.log(error);
        }
    },

    // 🟢 FORM EDIT
    edit: async (req, res) => {
        try {
            const producto = await db.Producto.findByPk(req.params.id);
            const categorias = await db.Categoria.findAll();
            const brands = await db.Brand.findAll();

            res.render('products/productEdit', {
                producto,
                categorias,
                brands
            });

        } catch (error) {
            console.log(error);
        }
    },

    // 🟢 UPDATE
    update: async (req, res) => {
        try {
            await db.Producto.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                id_categorias: req.body.categoria,
                id_brands: req.body.brand
            }, {
                where: { id_productos: req.params.id }
            });

            res.redirect('/products/' + req.params.id);

        } catch (error) {
            console.log(error);
        }
    },

    // 🟢 DELETE
    destroy: async (req, res) => {
        try {
            await db.Producto.destroy({
                where: { id_productos: req.params.id }
            });

            res.redirect('/products');

        } catch (error) {
            console.log(error);
        }
    },

    // 🟢 BUSCAR

    search: async (req, res) => {
        try {
            const { Op } = db.Sequelize;

            const resultados = await db.Producto.findAll({
                where: {
                    nombre: {
                        [Op.like]: `%${req.query.keyword}%`
                    }
                },
                include: ['categoria', 'brand']
            });

            res.render('products/productList', {
                productos: resultados
            });

        } catch (error) {
            console.log(error);
            res.send('Error en búsqueda');
        }
    }

};

module.exports = productController;