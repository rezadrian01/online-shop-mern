const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    productId: {
        type: Schema.Types.ObjectId, 
        ref: "Product",
        required: true
    },
    ratting: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    }
}, { timestamps: true })                   

reviewSchema.index({ productId: 1 });

module.exports = mongoose.model("Review", reviewSchema)