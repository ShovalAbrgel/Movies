const User = require('../models/UserModel');

const addUser = async (user) => {
   try{
    const addUser = new User(user);
    return await addUser.save();
   }catch(error){
        console.log(error);
   }
};


module.exports = { addUser };
