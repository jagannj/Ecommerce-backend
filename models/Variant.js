const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    color: { type: String, required: true },
    stock: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Variant', variantSchema);
