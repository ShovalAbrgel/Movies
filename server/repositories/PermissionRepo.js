const Permission = require('../models/PermissionModel');


const getAllPermission =()=>{
    return Permission.find({});
}

module.exports={getAllPermission}