const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  event_id: { type: String, required: true, unique: true },
  account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  destination_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  received_data: { type: mongoose.Schema.Types.Mixed, required: true },
  received_timestamp: { type: Date, default: Date.now },
  processed_timestamp: { type: Date },
  status: { type: String, enum: ['success', 'failed'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
