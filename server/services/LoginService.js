const loginRepo = require('../repositories/LoginRepo');

const Login = async ()=>{
    try{
        const login = await loginRepo.findUserByUsername({username});
        return login;
    }catch(error){
        console.log(error);
    }
}

module.exports={Login};