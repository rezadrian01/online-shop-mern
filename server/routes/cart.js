const express = require('express');
const router = express.Router()
const { editUser } = require('../middleware/auth')
const { addCart } = require("../controllers/cart")

router.post('/:productId', editUser, addCart)

module.exports = router
