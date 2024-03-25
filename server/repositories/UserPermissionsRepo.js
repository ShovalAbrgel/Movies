const User = require('../models/LoginModel');


const getAllUserData=()=>{
    return User.find({});
}

module.exports={getAllUserData}