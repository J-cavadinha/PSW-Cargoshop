var mongoose = require('mongoose');
var normalize = require('normalize-mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "https://escoladegoverno.rs.gov.br/wp-content/uploads/2023/05/placeholder-1.png"
    }
});

productSchema.plugin(normalize);

var Products = mongoose.model('Product', productSchema);

module.exports = Products;