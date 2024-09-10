const express = require("express");
const router = express.Router();
const { createOrderFromCart } = require("../controllers/order");
const { editUser } = require("../middleware/auth");

router.post('/', editUser, createOrderFromCart)

module.exports = router;