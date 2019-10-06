const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'PageCategory'
  }
});

module.exports = mongoose.model('Page', PageSchema);
