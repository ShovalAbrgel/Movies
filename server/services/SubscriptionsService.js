const SubscriptionsRepo = require('../repositories/SubscriptionsRepo');

const getAllSubscriptions = async ()=>{
    try{
        const Subscriptions = await SubscriptionsRepo.getAllSubscription();
        return Subscriptions;
    }catch(error){
        console.log(error);
    }
}

module.exports={getAllSubscriptions};