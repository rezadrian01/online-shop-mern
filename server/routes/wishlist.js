const express = require('express');
const router = express.Router();
const { addWishlist, getWishlist, removeWishlist } = require('../controllers/wishlist');
const { editUser } = require('../middleware/auth');

router.get('/', editUser, getWishlist);
router.post('/add/:productId', editUser, addWishlist);
router.delete('/delete/:productId', editUser, removeWishlist);

module.exports = router;