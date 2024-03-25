const updateMemberRepo = require('../repositories/EditMemberRepo');

const updateMemberData = async (id,obj)=>{
    try{
        const updateMember = await updateMemberRepo.updateMemberById({id,obj});
        return updateMember;
    }catch(error){
        console.log(error);
    }
}

module.exports=updateMemberData;