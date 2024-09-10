const validator = require('validator')

const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order')
const { errorResponse } = require('../utils/error');

exports.createOrderFromCart = async (req, res, next) => {
    try {
        const { address, paymentMethod } = req.body;
        const existingUser = await User.findById(req.userId);
        if (!existingUser) errorResponse("Not authenticated", 401);
        const userCart = await Cart.find({ userId: req.userId }).populate('productId')
        if (!userCart) errorResponse("Your cart is empty");

        const newOrder = new Order({
            userId: existingUser,
            address: validator.escape(address),
            paymentMethod
        })
        const totalPrice = userCart.reduce((prev, item) => {
            return prev + item.productId.price * item.quantity
        }, 0)
        newOrder.totalPrice = totalPrice.toFixed(2);
        userCart.forEach(cart => {
            newOrder.products.push({ ...cart.productId._doc, quantity: cart.quantity })
        })
        const createdOrder = await newOrder.save();
        existingUser.order.push(createdOrder);
        existingUser.cart = [];
        await existingUser.save()
        res.status(200).json({ success: true, message: "Success create order" })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    }
}