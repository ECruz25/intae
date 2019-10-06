const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  pages: {
    type: [Schema.Types.ObjectId],
    ref: 'Page'
  }
});

module.exports = mongoose.model('PageCategory', PageCategorySchema);
