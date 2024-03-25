const express = require('express');
const router = express.Router();
const addSubRepo  = require('../repositories/AddSubRepo');


router.post('/subscriptions', async (req, res) => {
    const subscriptionData = req.body;
    console.log(` add user route called`);
    try {
        const newSubscription = await addSubRepo.addSub(subscriptionData);
        console.log('add user response:', newSubscription); 

        return res.json(newSubscription);

        
    } catch (error) {
        console.log('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
