const addMemberRepo = require('../repositories/AddMemberRepo');

const addNewMember= async ()=>{
    try{
        const newMember = await addMemberRepo.addMember({member});
        return newMember;
    }catch(error){
        console.log(error);

    }
}

module.exports={addNewMember};