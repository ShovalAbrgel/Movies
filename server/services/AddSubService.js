const addSubRepo = require('../repositories/AddSubRepo');

const addSub = async ()=>{
    try{
        const addNewSub = await addSubRepo.addSub({subscriptionData});
        return addNewSub;
    }catch(error){
        console.log(error,"in the service");
    }
}

module.exports={addSub};