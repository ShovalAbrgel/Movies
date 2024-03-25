const deleteMemberRepo = require('../repositories/deleteMemberRepo');

const deleteMember = async ()=>{
    try{
        const deletemember = await deleteMemberRepo.deleteMemberId({id});
        return deletemember;
    }catch(error){
        console.log(error);
    }
}

module.exports={deleteMember};