const permissionsRepo = require('../repositories/PermissionRepo');

const getAllPermissions = async ()=>{
    try{
        const permissions = await permissionsRepo.getAllPermissions();
        return permissions;
    }catch(error){
        console.log(error);
    }
}

module.exports={getAllPermissions};