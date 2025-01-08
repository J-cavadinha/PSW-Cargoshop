import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

const pechinchaSchema = new Schema({
    descount: {
        type: Number,
        required: false
    },
    idProduct: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

pechinchaSchema.plugin(normalize)

var Pechinchas = model('Pechincha', pechinchaSchema);

export default Pechinchas;