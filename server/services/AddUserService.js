const addUserRepo = require('../repositories/AddUserRepo');

const addUser = async ()=>{
    try{
        const adduser = await addUserRepo.addUser({user});
        return adduser;
    }catch(error){
        console.log(error);
    }
}

module.exports={addUser};