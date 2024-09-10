const Review = require('../models/review');
const Product = require('../models/product');
const User = require('../models/user');
const { errorResponse } = require('../utils/error');


exports.createReview = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const existingUser = await User.findById(req.userId);
        const existingProduct = await Product.findById(productId);
        if (!existingUser) errorResponse("Not authenticated", 401);
        if (!existingProduct) errorResponse("Product not found");
        //
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err)
    }
}
