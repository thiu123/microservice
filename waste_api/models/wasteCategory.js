const mongoose = require('mongoose');

const wasteCategorieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    disposalGuidelines: {
        type: String,
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model('WasteCategory', wasteCategorieSchema);