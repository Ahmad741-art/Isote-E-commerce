const Product = require('../models/Product');
const InventoryMovement = require('../models/InventoryMovement');
const AdminLog = require('../models/AdminLog');
const Warehouse = require('../models/Warehouse');

async function ensureStockLevelEntry(product, warehouseId) {
  const idx = product.stockLevels.findIndex(s => s.warehouse.toString() === warehouseId.toString());
  if (idx === -1) {
    product.stockLevels.push({ warehouse: warehouseId, quantity: 0, reserved: 0 });
    return product.stockLevels.length - 1;
  }
  return idx;
}

exports.adjustStock = async (req, res) => {
  try {
    const { productId, warehouseId, qty, type = 'adjustment', notes, relatedId } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    await Warehouse.findById(warehouseId); // optional validation

    const idx = await ensureStockLevelEntry(product, warehouseId);
    product.stockLevels[idx].quantity = (product.stockLevels[idx].quantity || 0) + Number(qty);
    await product.save();

    await InventoryMovement.create({
      product: productId,
      warehouse: warehouseId,
      quantity: Number(qty),
      type,
      user: req.user ? req.user._id : null,
      notes,
      relatedId,
    });

    await AdminLog.create({ user: req.user._id, action: 'adjust_stock', entity: 'Product', entityId: product._id, diff: { warehouseId, qty } });

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.transferStock = async (req, res) => {
  try {
    const { productId, fromWarehouseId, toWarehouseId, qty, notes } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const fromIdx = await ensureStockLevelEntry(product, fromWarehouseId);
    if ((product.stockLevels[fromIdx].quantity || 0) < qty) {
      return res.status(400).json({ success: false, message: 'Insufficient stock in source warehouse' });
    }
    const toIdx = await ensureStockLevelEntry(product, toWarehouseId);

    product.stockLevels[fromIdx].quantity -= Number(qty);
    product.stockLevels[toIdx].quantity = (product.stockLevels[toIdx].quantity || 0) + Number(qty);

    await product.save();

    await InventoryMovement.create({
      product: productId,
      warehouse: fromWarehouseId,
      quantity: -Math.abs(Number(qty)),
      type: 'transfer_out',
      user: req.user._id,
      notes,
      relatedId: null,
    });
    await InventoryMovement.create({
      product: productId,
      warehouse: toWarehouseId,
      quantity: Math.abs(Number(qty)),
      type: 'transfer_in',
      user: req.user._id,
      notes,
      relatedId: null,
    });

    await AdminLog.create({ user: req.user._id, action: 'transfer_stock', entity: 'Product', entityId: product._id, diff: { fromWarehouseId, toWarehouseId, qty } });

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProductStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('stockLevels.warehouse', 'name code');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, stockLevels: product.stockLevels });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};