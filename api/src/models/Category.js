const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  type: { type: String, enum: ['expense', 'income'], required: true },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
