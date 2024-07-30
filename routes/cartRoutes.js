const express = require('express');
const { getCart, addToCart, updateCart, clearCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart)
    .put(protect, updateCart)
    .delete(protect, clearCart);

module.exports = router;
