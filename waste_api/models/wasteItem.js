const mongoose = require('mongoose');

const wasteItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WasteCategory',
    required: true,
  },
  sortingInstructions: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('WasteItem', wasteItemSchema);