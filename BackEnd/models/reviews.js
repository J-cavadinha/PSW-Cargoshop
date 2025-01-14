var mongoose = require('mongoose');
var normalize = require('normalize-mongoose');

const reviewSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido'
    },
    seller: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    }
});

reviewSchema.plugin(normalize);

var Reviews = mongoose.model('Review', reviewSchema);

module.exports = Reviews;