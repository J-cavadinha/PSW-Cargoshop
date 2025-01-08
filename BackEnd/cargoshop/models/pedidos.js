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
    produto: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

pedidoSchema.plugin(normalize)

var Pedidos = model('Pedido', pedidoSchema);

export default Pedidos;