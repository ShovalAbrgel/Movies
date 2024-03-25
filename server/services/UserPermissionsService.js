const usersRepo = require('../repositories/UserPermissionsRepo');

const getAllUsersData = async ()=>{
    try{
        const user = await usersRepo.getAllUserData();
        return user;
    }catch(error){
        console.log(error);
    }
}

module.exports={getAllUsersData};