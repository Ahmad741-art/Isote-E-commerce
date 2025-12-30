const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  getProductBySlug,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);
router.get('/slug/:slug', getProductBySlug);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
