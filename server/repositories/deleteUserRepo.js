const User = require('../models/UserModel');

const deleteUserById = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
    console.log(`User with ID ${userId} has been deleted`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {deleteUserById};
