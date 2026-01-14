const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  entity: { type: String }, // e.g. "Product", "Warehouse"
  entityId: { type: mongoose.Schema.Types.ObjectId },
  diff: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('AdminLog', adminLogSchema);