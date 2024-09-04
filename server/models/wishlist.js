const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
})

wishlistSchema.index({ userId: 1 })

module.exports = mongoose.model("Wishlist", wishlistSchema)