const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const warehouseController = require('../controllers/warehouseController');

router.post('/', protect, admin, warehouseController.createWarehouse);
router.get('/', protect, admin, warehouseController.listWarehouses);
router.put('/:id', protect, admin, warehouseController.updateWarehouse);
router.delete('/:id', protect, admin, warehouseController.deleteWarehouse);

module.exports = router;