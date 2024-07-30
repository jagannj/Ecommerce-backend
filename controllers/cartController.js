const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Variant = require('../models/Variant');

exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product').populate('items.variant');

    if (cart) {
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
};

exports.addToCart = async (req, res) => {
    const { productId, variantId, quantity } = req.body;

    const product = await Product.findById(productId);
    const variant = await Variant.findById(variantId);

    if (!product || !variant) {
        res.status(404);
        throw new Error('Product or Variant not found');
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.equals(productId) && item.variant.equals(variantId));

    if (itemIndex >= 0) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ product: productId, variant: variantId, quantity });
    }

    await cart.save();
    res.json(cart);
};

exports.updateCart = async (req, res) => {
    const { productId, variantId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => item.product.equals(productId) && item.variant.equals(variantId));

    if (itemIndex >= 0) {
        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Item not found in cart');
    }
};

exports.clearCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.items = [];
        await cart.save();
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
};
