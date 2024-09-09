const express = require('express');
const router = express.Router()
const { editUser } = require('../middleware/auth')
const { addCart, getCart, removeCart } = require("../controllers/cart")

router.get('/', editUser, getCart)
router.post('/:productId', editUser, addCart)
router.delete('/:productId', editUser, removeCart)

module.exports = router
