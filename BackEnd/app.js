/**
 * Arquivo principal da aplicação Express que configura as rotas, middlewares e a conexão com o banco de dados.
 * 
 * @module app
 */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var pechinchasRouter = require('./routes/pechinchas');
var pedidosRouter = require('./routes/pedidos');
var reviewsRouter = require('./routes/reviews');
var usersRouter = require('./routes/users');
const uploadRouter = require('./routes/uploadRouter');

var config = require('./config');
const mongoose = require('mongoose');
const cors = require('./routes/cors');

// Configuração da URL de conexão do MongoDB
const url = config.mongoUrl;
const connect = mongoose.connect(url);

// Conexão com o MongoDB
connect.then((db) => {
    console.log("Conectado corretamente ao servidor");
}, (err) => {
    console.log(err);
});

var app = express();

// Configuração de CORS
app.use(cors.corsWithOptions);
app.options('*', cors.corsWithOptions);

// Configuração de middlewares
app.use(logger('dev')); // Logger de requisições HTTP
app.use(express.json()); // Parser para dados JSON
app.use(express.urlencoded({ extended: false })); // Parser para dados URL-encoded

// Inicialização do Passport (para autenticação)
app.use(passport.initialize());

// Configuração de rotas
app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, 'public'))); // Pasta pública para arquivos estáticos
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // Rota para imagens

// Definição das rotas principais
app.use('/products', productsRouter);
app.use('/pechinchas', pechinchasRouter);
app.use('/pedidos', pedidosRouter);
app.use('/reviews', reviewsRouter);
app.use('/imageUpload', uploadRouter);

module.exports = app;
