const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  completed: {type: Boolean, required: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
  completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: false },
  createdOn: { type: String, required: true},
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'list', required: true }
});
 module.exports = mongoose.model('itemList', itemSchema);
