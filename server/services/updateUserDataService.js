const updateRepo = require('../repositories/updateUserDataRepo');

const updateUserData = async ()=>{
    try{
        const updateUser = await updateRepo.updateUserById({userId,obj});
        return updateUser;
    }catch(error){
        console.log(error);
    }
}

module.exports={updateUserData};