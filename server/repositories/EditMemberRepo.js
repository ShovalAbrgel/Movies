const Member = require('../models/MembersModel');

const updateMemberById= async (id, updatedData) => {
  try {
    const updatedMember = await Member.findOneAndUpdate(
      { _id: id },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedMember) {
      throw new Error(`Member not found with ID: ${id}`);
    }

    return updatedMember;
  } catch (error) {
    throw new Error(`Error updating member: ${error.message}`);
  }
};

module.exports = {
    updateMemberById,
};


