const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const inventoryController = require('../controllers/inventoryController');

router.post('/adjust', protect, admin, inventoryController.adjustStock);
router.post('/transfer', protect, admin, inventoryController.transferStock);
router.get('/product/:productId', protect, admin, inventoryController.getProductStock);

module.exports = router;