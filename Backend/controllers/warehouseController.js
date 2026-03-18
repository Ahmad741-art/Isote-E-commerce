const Warehouse = require('../models/Warehouse');

exports.createWarehouse = async (req, res) => {
  try {
    const w = await Warehouse.create(req.body);
    res.status(201).json({ success: true, data: w });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.listWarehouses = async (req, res) => {
  try {
    const list = await Warehouse.find({ isActive: true });
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateWarehouse = async (req, res) => {
  try {
    const w = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!w) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: w });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteWarehouse = async (req, res) => {
  try {
    await Warehouse.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};