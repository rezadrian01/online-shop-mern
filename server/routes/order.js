const express = require("express");
const router = express.Router();
const { createOrderFromCart, createOrder } = require("../controllers/order");
const { editUser } = require("../middleware/auth");

router.post('/', editUser, createOrderFromCart);
router.post('/:productId', editUser, createOrder)

module.exports = router;