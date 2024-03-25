const User = require('../models/UserModel');

const getAllUsers = async () => {
   return User.find({});
};


module.exports = { getAllUsers };
