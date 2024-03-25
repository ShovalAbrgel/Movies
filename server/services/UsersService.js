const usersRepo = require('../repositories/UsersRepo');

const getAllUsers = async ()=>{
    try{
        const user = await usersRepo.getAllUsers();
        return user;
    }catch(error){
        console.log(error);
    }
}

module.exports={getAllUsers};