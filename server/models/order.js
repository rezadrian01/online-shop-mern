const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        type: Object,
        required: true
    }],
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
}, { timestamps: true })

orderSchema.index({ userId: 1 });

module.exports = mongoose.model('Order', orderSchema);