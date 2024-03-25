const User = require('../models/UserModel');

const updateUserById = async (userId, updatedData) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error(`User not found with ID: ${userId}`);
    }

    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

module.exports = {
  updateUserById,
};


