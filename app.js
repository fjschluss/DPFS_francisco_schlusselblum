require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var db = require('./database/models');

var userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');


var mainRoutes = require('./routes/mainRoutes');
var productRoutes = require('./routes/productRoutes');
var userRoutes = require('./routes/userRoutes');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'lubo_fallback_secret',
  resave: false,
  saveUninitialized: false
}));

app.use(userLoggedMiddleware);

// ── Sesión en todas las vistas ────────────────────────────
app.use((req, res, next) => {
  res.locals.userLogged = req.session.userLogged || null;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// ── Rutas ─────────────────────────────────────────────────
app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

// ── 404 ───────────────────────────────────────────────────
app.use(function(req, res, next) {
  next(createError(404));
});

// ── 500 ───────────────────────────────────────────────────
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// ── Conectar DB ───────────────────────────────────────────
db.sequelize.authenticate()
  .then(() => console.log('Base conectada correctamente'))
  .catch(error => console.log(error));

module.exports = app;