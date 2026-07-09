const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true, trim: true },
  brand: { type: String, required: true, trim: true },
  model: { type: String, required: true },
  notes: { type: String, default: "", trim: true },
  etc: { type: String, default: "", trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);