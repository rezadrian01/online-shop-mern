const Product = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart')
const { errorResponse } = require('../utils/error')

exports.addCart = async (req, res, next) => {
    try {
        const { productId } = req.params
        const existingProduct = await Product.findById(productId)
        const existingUser = await User.findById(req.userId)
        if (!existingProduct) errorResponse("Product not found", 404)
        if (!existingUser) errorResponse("User not found", 404)

        existingCart = await Cart.findOne({ userId: existingUser, productId: existingProduct })
        let updatedCart;
        if (!existingCart) {
            updatedCart = new Cart({
                userId: req.userId,
                productId: existingProduct,
                quantity: 1
            })
        } else {
            existingCart.quantity += 1
            updatedCart = existingCart
        }
        createdCart = await updatedCart.save()
        existingUser.cart.push(createdCart)
        await existingUser.save()
        res.status(200).json({ success: true, message: "Success add product to cart" })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err)
    }
}
