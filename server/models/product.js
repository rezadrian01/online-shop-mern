const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categories: [
        {
            type: String,
        }
    ],
    images: [{
        type: String,
        required: true
    }],
    stock: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]

})

productSchema.index({ userId: 1 });


module.exports = mongoose.model("Product", productSchema)