const express = require('express');
const router = express.Router();
const { getProduct, getProducts, newProduct } = require('../controllers/product');
const { uploadMultiple } = require('../utils/multerConfig');

router.get('/', getProducts);
router.get('/:productId', getProduct)
router.post('/new', uploadMultiple, newProduct)

module.exports = router;