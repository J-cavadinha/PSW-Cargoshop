import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

const pedidoSchema = new Schema({
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
        type: Schema.Types.ObjectId,
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
})

pedidoSchema.plugin(normalize)

var Pedidos = model('Pedido', pedidoSchema);

export default Pedidos;