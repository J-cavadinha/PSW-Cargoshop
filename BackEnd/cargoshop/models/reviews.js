import { Schema, model } from 'mongoose';
import normalize from 'normalize-mongoose';

const reviewSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
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
})

reviewSchema.plugin(normalize)

var Reviews = model('Review', reviewSchema);

export default Reviews;