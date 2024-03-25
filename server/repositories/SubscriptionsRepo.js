const Subscription = require('../models/SubscriptionsModel');


const getAllSubscription=()=>{
    return Subscription.find({});
}

module.exports={getAllSubscription}