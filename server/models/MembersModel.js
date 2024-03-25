const mongoose = require('mongoose');

const MembersSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  City: String
}, { versionKey: false , collection : 'Members' });

const Member = mongoose.model('Member', MembersSchema);

module.exports = Member;
