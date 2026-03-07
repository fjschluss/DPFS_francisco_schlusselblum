var createError = require('http-errors');
var express = require('express');
var path = require('path');
var methodOverride = require("method-override");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
var logger = require('morgan');

// Importar rutas
var mainRoutes = require("./routes/mainRoutes");
var productRoutes = require("./routes/productRoutes");
var userRoutes = require("./routes/userRoutes");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(session({
    secret: 'secreto-super',
    resave: false,
    saveUninitialized: false
}));
app.use(userLoggedMiddleware);
app.use((req, res, next) => {
    res.locals.userLogged = req.session.userLogged;
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

// Usar rutas
app.use("/", mainRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;