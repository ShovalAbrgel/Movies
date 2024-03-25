const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  permissions: [{ permissionsId: { type: mongoose.Schema.Types.ObjectId } }] 
}, { versionKey: false, collection: 'UsersAuth' });

const User = mongoose.model('User', userSchema, 'UsersAuth');

module.exports = User;
