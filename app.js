require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { rememberMe } = require('./src/middlewares/auth.middleware');
const { sequelize } = require('./database/models');

const app = express();
const PORT = process.env.PORT || 3000;

// Motor de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middlewares base
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(methodOverride('_method'));
app.use(cookieParser());

// Sesiones
app.use(session({
    secret: process.env.SESSION_SECRET || 'lubo-secret-key-2025',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Middleware de auto-login por cookie "recordarme"
app.use(rememberMe);

// Rutas
const mainRouter     = require('./src/routes/main.routes');
const productsRouter = require('./src/routes/products.routes');
const usersRouter    = require('./src/routes/users.routes');

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada', session: req.session });
});

// Iniciar servidor solo si la BD conecta
sequelize.authenticate()
    .then(() => {
        console.log('✅ Conexión a MySQL establecida');
        app.listen(PORT, () => {
            console.log(`LuBo corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ No se pudo conectar a MySQL:', err.message);
        process.exit(1);
    });