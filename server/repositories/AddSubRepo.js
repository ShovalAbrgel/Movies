const Subscriptions = require('../models/SubscriptionsModel');

const addSub = async (subscriptionData) => {
   try{
    const newSubscription = new Subscriptions(subscriptionData);
    return await newSubscription.save();
   }catch(error){
        console.log(error , "in the repo");
   }
};


module.exports = { addSub };
