var mongoose = require('mongoose');
var normalize = require('normalize-mongoose');

const pechinchaSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    image: {
        type: String,
        required: true
    },
    status: { 
        type: String,  
        default: 'pendente' 
    }
});

pechinchaSchema.plugin(normalize);

var Pechinchas = mongoose.model('Pechincha', pechinchaSchema);

module.exports = Pechinchas;
