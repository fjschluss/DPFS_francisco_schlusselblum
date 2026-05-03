const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Motor de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

// Rutas
const mainRouter = require('./src/routes/main.routes');
const productsRouter = require('./src/routes/products.routes');
const usersRouter = require('./src/routes/users.routes');

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

app.listen(PORT, () => {
    console.log(`LuBo corriendo en http://localhost:${PORT}`);
});