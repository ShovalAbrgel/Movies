const Member = require('../models/MembersModel');


const getAllMembers =()=>{
    return Member.find({});
}

module.exports={getAllMembers}