const mongoose = require('mongoose');

const inventoryMovementSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  quantity: { type: Number, required: true }, // + for inbound, - for outbound
  type: {
    type: String,
    enum: ['adjustment', 'sale', 'purchase', 'transfer_out', 'transfer_in', 'return'],
    required: true,
  },
  relatedId: { type: String }, // optional order id / po id
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // actor
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('InventoryMovement', inventoryMovementSchema);