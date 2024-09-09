const express = require('express');
const router = express.Router()
const { editUser } = require('../middleware/auth')
const { addCart, getCart } = require("../controllers/cart")

router.get('/', editUser, getCart)
router.post('/:productId', editUser, addCart)

module.exports = router
