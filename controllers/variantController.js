const Variant = require('../models/Variant');
const Product = require('../models/Product');

exports.getVariants = async (req, res) => {
    const variants = await Variant.find({});
    res.json(variants);
};

exports.getVariantById = async (req, res) => {
    const variant = await Variant.findById(req.params.id);

    if (variant) {
        res.json(variant);
    } else {
        res.status(404);
        throw new Error('Variant not found');
    }
};

exports.createVariant = async (req, res) => {
    const { product, color, stock } = req.body;

    const variant = new Variant({
        product,
        color,
        stock,
    });

    const createdVariant = await variant.save();

    const productDoc = await Product.findById(product);
    productDoc.variants.push(createdVariant._id);
    await productDoc.save();

    res.status(201).json(createdVariant);
};

exports.updateVariant = async (req, res) => {
    const { color, stock } = req.body;

    const variant = await Variant.findById(req.params.id);

    if (variant) {
        variant.color = color || variant.color;
        variant.stock = stock || variant.stock;

        const updatedVariant = await variant.save();
        res.json(updatedVariant);
    } else {
        res.status(404);
        throw new Error('Variant not found');
    }
};

exports.deleteVariant = async (req, res) => {
    const variant = await Variant.findById(req.params.id);

    if (variant) {
        await variant.remove();
        res.json({ message: 'Variant removed' });
    } else {
        res.status(404);
        throw new Error('Variant not found');
    }
};
