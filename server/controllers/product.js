const validator = require('validator')
const Product = require('../models/product');
const User = require('../models/user')
const { errorResponse } = require('../utils/error');
const { deleteProductImage } = require('../utils/file')

let perRequest = 10;

exports.newProduct = async (req, res, next) => {
    try {
        const { title, description, price, categories, stock } = req.body;
        const { validTitle, validDescription, validPrice, validCategories, validStock, errors } = productValidation(title, description, price, categories, stock)
        if (!req?.files || req?.files?.length === 0) errorResponse("Image must be uploaded", 422);
        if (errors.length > 0) errorResponse("Validation failed", 422, errors);
        const existingUser = await User.findById(req.userId);
        if (!existingUser) errorResponse('User not found', 404);

        let images = []
        req.files.forEach(image => {
            images.push(image.path.replace(/\\/g, '/'))
        })

        const newProduct = new Product({
            title: validTitle,
            description: validDescription,
            price: validPrice,
            categories: validCategories,
            images,
            stock: validStock,
            discount: 0,
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


exports.getProducts = async (req, res, next) => {
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


exports.updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params
        const existingProduct = await Product.findById(productId)
        const existingUser = await User.findById(req.userId)
        if (!existingUser) errorResponse("User not found")
        if (!existingProduct) errorResponse("Product not found", 404)
        if (existingProduct.userId.toString() !== req.userId.toString()) errorResponse("Access denied", 403)
        const { title, description, price, categories, discount } = req.body;
        const { validTitle, validDescription, validPrice, validCategories, errors } = productValidation(title, description, price, categories, null, true)
        if (errors.length > 0) errorResponse("Validation failed", 422, errors)

        existingProduct.title = validTitle;
        existingProduct.description = validDescription;
        existingProduct.price = validPrice;
        existingProduct.discount = discount ? validator.escape(discount) : 0;
        existingProduct.categories = validCategories;
        let images = []
        if (req.files.length > 0) {
            await Promise.all(existingProduct.images.map(image => deleteProductImage(image, next)))
            req.files.forEach(file => {
                images.push(file.path.replace(/\\/g, '/'))
            })
            existingProduct.images = images
        }
        await existingProduct.save()
        res.status(200).json({ success: true, message: "Success update product" })

    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const existingProduct = await Product.findById(productId);
        const existingUser = await User.findById(req.userId);
        if (!existingProduct) errorResponse("Product not found", 404);
        if (!existingUser) errorResponse("User not found", 404);

        await Promise.all(existingProduct?.images?.map((image) => deleteProductImage(image, next)))

        await Product.findByIdAndDelete(productId);
        existingUser.products.pull(productId);
        await existingUser.save();
        res.status(200).json({ success: true, message: "Success delete product" })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err)
    }
}


const productValidation = (title, description, price, categories, stock, isUpdate = false) => {
    let errors = [];
    const validTitle = !validator.isEmpty(title[0]?.trim())
    const validDescription = !validator.isEmpty(description[0]?.trim());
    const validPrice = !validator.isEmpty(price[0]?.trim())
    const validStock = !isUpdate ? !validator.isEmpty(stock[0]?.trim()) : true

    if (!validTitle) errors.push("Invalid title")
    if (!validDescription) errors.push('Invalid description')
    if (!validPrice) errors.push("Invalid price")
    if (!validStock) errors.push("Invalid stock")
    if (categories.length === 0) errors.push("Invalid categories")
    return {
        validTitle: validator.escape(title),
        validDescription: validator.escape(description),
        validPrice: validator.escape(price),
        validCategories: categories.map(category => validator.escape(category)),
        validStock: !isUpdate ? validator.escape(stock) : null,
        errors
    }
}


const updateProductValidation = () => {
    const errors = [];

}