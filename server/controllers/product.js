const validator = require('validator')
const Product = require('../models/product');
const User = require('../models/user')
const { errorResponse } = require('../utils/error');

let perRequest = 10;

exports.getProducts = async (req, res, next) => {
    // let subRequest = req.query.subRequest;
    // console.log(req.userId, req.isAuth);
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
        const { title, description, price, categories, stock } = req.body;
        const { validTitle, validDescription, validPrice, validCategories, validStock, errors } = createProductValidation(title, description, price, categories, stock)

        if (!req.files) errorResponse("Image must be uploaded", 422);
        if (errors.length > 0) errorResponse("Validation failed", 422, errors);

        const existingUser = await User.findById(req.userId);
        if (!existingUser) errorResponse('User not found', 404);

        let images = []
        req.files.forEach(image => {
            images.push(image.path.replace(/\\/g, '-'))
        })
        console.log(images);

        const newProduct = new Product({
            title: validTitle,
            description: validDescription,
            price: validPrice,
            categories: validCategories,
            images,
            stock: validStock,
            discount: req.body.discount || 0,
            userId: existingUser,
            sizes: req.body.sizes || [],
            colors: req.body.colors || []
        })

        const createdProduct = await newProduct.save();
        existingUser.products.push(createdProduct);
        await existingUser.save();
        res.status(201).json({ success: true, message: 'Success create product' });

    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {

    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    }
}


const createProductValidation = (title, description, price, categories, stock) => {
    let errors = [];
    const validTitle = !validator.isEmpty(title.trim())
    const validDescription = !validator.isEmpty(description.trim());
    const validPrice = !validator.isEmpty(price.trim())
    const validStock = !validator.isEmpty(stock.trim())

    if (!validTitle) errors.push("Invalid title")
    if (!validDescription) errors.push('Invalid description')
    if (!validPrice) errors.push("Invalid price")
    if (!validStock) errors.push("Invalid stock")
    if (categories.length === 0) errors.push("Invalid categories")

    return {
        validTitle: title,
        validDescription: description,
        validPrice: price,
        validCategories: categories,
        validStock: stock,
        errors
    }
}