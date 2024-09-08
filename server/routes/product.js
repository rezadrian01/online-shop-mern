const express = require('express');
const router = express.Router();
const { getProduct, getProducts, newProduct, deleteProduct, updateProduct } = require('../controllers/product');
const { uploadMultiple } = require('../utils/multerConfig');
const { editUser } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/:productId', getProduct)
router.put('/:productId', editUser, uploadMultiple, updateProduct)
router.post('/new', editUser, uploadMultiple, newProduct)
router.delete('/delete/:productId', editUser, deleteProduct)

module.exports = router;