const Product = require('../models/product');
const { errorResponse } = require('../utils/error');

let perRequest = 10;

exports.getProducts = async (req, res, next) => {
    // let subRequest = req.query.subRequest;
    try {
        const products = await Product.find();
        const totalProducts = await Product.find().countDocuments();
        res.status(200).json({ success: true, message: "Success get products", products, totalProducts })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) errorResponse('Product not found', 404);
        res.status(200).json({ success: true, message: 'Success get a post', product })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    }
}

exports.newProduct = async (req, res, next) => {
    try {
        // const { title, price, quantity, description, categories, files } = req.body;
        console.log(req.body);
        console.log(req.files)

    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    }
}