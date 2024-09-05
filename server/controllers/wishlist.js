const Product = require('../models/product');
const User = require('../models/user');
const wishlist = require('../models/wishlist');
const Wishlist = require('../models/wishlist');
const { errorResponse } = require('../utils/error');

exports.addWishlist = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) errorResponse('Product not found', 404);
        const existingUser = await User.findById(req.userId);
        if (!existingUser) errorResponse('User not found', 404);
        const newwishlist = new Wishlist({
            productId: existingProduct._id,
            userId: existingUser._id
        })
        existingUser.wishlist.push(existingProduct);
        await existingUser.save();
        await newwishlist.save();
        res.status(201).json({ success: true, message: "Success add wishlist" })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    }
}

exports.getWishlist = async (req, res, next) => {
    try {
        const existingUser = await User.findById(req.userId);
        if (!existingUser) errorResponse("User not found", 404);

        const products = await Wishlist.find({ userId: existingUser._id });
        res.status(200).json({ success: true, message: "Success get wishlist", products })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    }
}

exports.removeWishlist = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) errorResponse("Product not found", 404)

        const existingUser = await User.findById(req.userId);
        if (!existingUser) errorResponse("User not found", 404);

        const existingWishlist = await Wishlist.findOne({ userId: existingUser._id, productId: productId });
        if (!existingWishlist) errorResponse("Product and user not found in wishlist");

        existingUser.wishlist.pull(existingWishlist._id);
        await user.save();
        wishlist.findByIdAndDelete(existingWishlist);

        res.status(200).json({ success: true, message: "Success remove wishlsit item" })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    }
}