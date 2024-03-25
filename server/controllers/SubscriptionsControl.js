const express = require('express');
const SubscriptionsService = require('../services/SubscriptionsService');

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('GET /grade route called');
    try {
        const Subscriptions = await SubscriptionsService.getAllSubscriptions();
        res.json(Subscriptions);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports=router;