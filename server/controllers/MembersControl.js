const express = require('express');
const memberService = require('../services/MembersWB');

const router = express.Router();

router.get('/Members', async (req, res) => {
    console.log('GET /grade route called');
    try {
        const member = await memberService.getAllMembers();
        res.json(member);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports=router;