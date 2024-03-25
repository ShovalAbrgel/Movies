const deleteUserRepo = require('../repositories/deleteUserRepo');

const deleteUser = async ()=>{
    try{
        const deleteuser = await deleteUserRepo.deleteUserById({userid});
        return deleteuser;
    }catch(error){
        console.log(error);
    }
}

module.exports={deleteUser};