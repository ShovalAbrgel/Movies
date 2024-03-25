const Member = require('../models/MembersModel');

const addMember = async (member) => {
   try{
    const addNewMember = new Member(member);
    return await addNewMember.save();
   }catch(error){
        console.log(error , "in the repo");
   }
};


module.exports = { addMember };
