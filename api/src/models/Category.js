const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ['+', '-'] }, // Use enum to restrict values to '+' and '-'
    description: { type: String },
    imageUrl: { type: String },
});

module.exports = mongoose.model('Category', categorySchema);

