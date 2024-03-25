const User = require('../models/LoginModel');

const findUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw new Error('Error finding user');
  }
};

const findUserByUsernameAndPassword = async (username, password) => {
  try {
    const user = await User.findOne({ username, password });
    return user;
  } catch (error) {
    throw new Error('Error finding user by username and password');
  }
};

module.exports = { findUserByUsername, findUserByUsernameAndPassword };
