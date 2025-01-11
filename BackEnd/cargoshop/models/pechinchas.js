import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

const pechinchaSchema = new Schema({
    descount: {
        type: Number,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    idProduct: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    image: {
        type: String,
        required: true
    }
})

pechinchaSchema.plugin(normalize)

var Pechinchas = model('Pechincha', pechinchaSchema);

export default Pechinchas;