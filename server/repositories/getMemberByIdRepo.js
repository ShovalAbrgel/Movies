const Member = require('../models/MembersModel');

const getMemberById = async (memberId) => {
    try {
        const member = await Member.findById(memberId);
        return member;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch member by ID');
    }
};

module.exports = { getMemberById };
