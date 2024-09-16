const Product = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart')
const { errorResponse } = require('../utils/error')

exports.addCart = async (req, res, next) => {
    try {
        //can add product with multiple quantity
        const { productId } = req.params
        const existingProduct = await Product.findById(productId)
        const existingUser = await User.findById(req.userId)
        if (!existingProduct) errorResponse("Product not found", 404)
        if (!existingUser) errorResponse("User not found", 404)

        existingCart = await Cart.findOne({ userId: existingUser, productId: existingProduct })
        // let updatedCart;
        if (!existingCart) {
            newCart = new Cart({
                userId: req.userId,
                productId: existingProduct,
                quantity: 1
            })
            const createdCart = await newCart.save()
            existingUser.cart.push(existingProduct)
            await existingUser.save()
        } else {
            existingCart.quantity += 1
            await existingCart.save()
        }
        res.status(200).json({ success: true, message: "Success add product to cart" })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err)
    }
}

exports.getCart = async (req, res, next) => {
    try {
        const existingUser = await User.findById(req.userId)
        if (!existingUser) errorResponse("User not found", 404)
        const userCarts = await Cart.find({ userId: existingUser }).populate("productId").select("productId, quantity")
        const formattedCarts = userCarts.map(product => ({ ...product.productId._doc, quantity: product.quantity }))
        res.status(200).json({ success: true, message: "Success get cart", data: formattedCarts })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err)
    }
}


exports.removeCart = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const existingProduct = await Product.findById(productId);
        const existingUser = await User.findById(req.userId)
        if (!existingProduct) errorResponse("Product not found", 404)
        if (!existingUser) errorResponse("User not found", 404)

        const existingCart = await Cart.findOne({ userId: existingUser, productId: existingProduct })
        if (!existingCart) errorResponse("Invalid cart")
        if (existingCart.quantity > 1) {
            existingCart.quantity -= 1
            await existingCart.save()
            res.status(200).json({ success: true, message: "Success update cart quantity" })
        } else {
            await existingUser.cart.pull(existingProduct)
            await existingUser.save()
            await Cart.findByIdAndDelete(existingCart._id.toString())
            res.status(200).json({ success: true, message: "Success delete product form cart" })
        }
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err)
    }
}