const mongoose = require('mongoose');

const listUserSchema = mongoose.Schema({
  email: {type: String, required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'list', required: true }
});
module.exports = mongoose.model('listUser', listUserSchema);
