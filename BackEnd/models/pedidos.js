var mongoose = require('mongoose');
var normalize = require('normalize-mongoose');

const pedidoSchema = new mongoose.Schema({
    endereco: {
        type: String,
        required: true
    },
    opcaoEnvio: {
        type: String,
        required: true
    },
    formaPagamento: {
        type: String,
        required: true
    },
    idProduto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    NomeVendedor: {
        type: String,
        required: false
    },     
    comprador: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
    },
    endereco: {
        type: String,
        required: false
    }
});

pedidoSchema.plugin(normalize);

var Pedidos = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedidos;