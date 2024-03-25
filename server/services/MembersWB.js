const memberRepo = require('../repositories/MembersRepo');

const getAllMembers = async ()=>{
    try{
        const member = await memberRepo.getAllMembers();
        return member;
    }catch(error){
        console.log(error);
    }
}

module.exports={getAllMembers};