const express = require('express');
const router = express.Router();
const deleteMemberRepo  = require('../repositories/deleteMemberRepo');

router.delete('/Members/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`DELETE /Members/${id} route called`);
    try {
        const deleteMembers = await deleteMemberRepo.deleteMemberId(id);
        return res.json(deleteMembers);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
