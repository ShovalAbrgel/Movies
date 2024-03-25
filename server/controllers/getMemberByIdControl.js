const express = require('express');
const router = express.Router();
const memberRepo = require('../repositories/getMemberByIdRepo');

router.get('/members/:memberid', async (req, res) => {
    console.log('GET /members/:memberid route called');
    try {
        const memberId = req.params.memberid;
        const member = await memberRepo.getMemberById(memberId);
        res.json(member);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
