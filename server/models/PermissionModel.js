const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  UserName: { type: String },
  Permissions: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{ versionKey: false, collection: 'permissions' });

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
