const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  name: {type: String, required: true},
  sharedWith: {type: [String], required: true},
  description: {type: String, required: true},
  dateCreated: {type: String, required: true},
  dueDate: {type: String, required: false},
  listItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'itemList', required: true, autopopulate: true }],
  priority: {type: Number, required: true},
  createdBy: {type: String, required: true}
});

listSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('list', listSchema);
