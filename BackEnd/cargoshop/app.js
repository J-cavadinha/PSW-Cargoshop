var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var pechinchasRouter = require('./routes/pechinchas');
var pedidosRouter = require('./routes/pedidos');
var reviewsRouter = require('./routes/reviews');
var usersRouter = require('./routes/users');

var config = require('./config');

const mongoose = require('mongoose');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Conectado corretamente ao servidor");
}, (err) => {
    console.log(err);
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('53982-13486-42972-47623'));

app.use(passport.initialize());

//app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productsRouter);
app.use('/pechinchas', pechinchasRouter);
app.use('/pedidos', pedidosRouter);
app.use('/reviews', reviewsRouter);

module.exports = app;