const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  CreatedDate: Date,
  SessionTimeOut: Number,
  permissions: [String],
  UserName : String
}, { versionKey: false, collection: 'UsersData' });

const User = mongoose.model('UsersData', userSchema);

module.exports = User;
