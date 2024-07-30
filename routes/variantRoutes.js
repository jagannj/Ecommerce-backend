const express = require('express');
const { getVariants, getVariantById, createVariant, updateVariant, deleteVariant } = require('../controllers/variantController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
    .get(getVariants)
    .post(protect, createVariant);

router.route('/:id')
    .get(getVariantById)
    .put(protect, updateVariant)
    .delete(protect, deleteVariant);

module.exports = router;
