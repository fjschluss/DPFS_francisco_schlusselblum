require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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

app.use((req, res, next) => {
  res.locals.userLogged = req.session.userLogged || null;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;