const db = require('./database/models');

db.Producto.findAll({
    include: ['categoria', 'brand']
})
    .then(productos => {
        console.log('✅ Relaciones cargadas');

        productos.forEach(producto => {
            console.log('-------------------');
            console.log('Producto:', producto.nombre);
            console.log('Categoría:', producto.categoria ? producto.categoria.nombre : 'NO CARGÓ');
            console.log('Brand:', producto.brand ? producto.brand.nombre : 'NO CARGÓ');
        });
    })
    .catch(error => {
        console.log('❌ Error al probar relaciones');
        console.log(error);
    });