const Member = require('../models/MembersModel');

const deleteMemberId = async (id) => {
  try {
    await Member.findByIdAndDelete(id);
    console.log(`Member with ID ${id} has been deleted`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {deleteMemberId};
