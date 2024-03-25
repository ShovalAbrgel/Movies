const memberByIdRepo = require('../repositories/getMemberByIdRepo');

const getMemberById = async (memberId) => {
    try {
        const member = await memberByIdRepo.getMemberById(memberId);
        return member;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch member by ID');
    }
};

module.exports = { getMemberById };
