const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },

    phone: {
        type: Number
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    address: [
        {
            type: String
        }
    ],
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: "Cart"
        }
    ],
    order: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
})

module.exports = mongoose.model('User', userSchema)