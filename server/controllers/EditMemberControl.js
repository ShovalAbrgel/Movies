const express = require('express');
const router = express.Router();
const updateMemberRepo  = require('../repositories/EditMemberRepo');

router.put('/Members/:id', async (req, res) => {
    const { id } = req.params; 
    const obj = req.body;
    console.log(obj);
    console.log(`UPDATE /member/${id} route called`);
    try {
        const updateMember = await updateMemberRepo.updateMemberById(id, obj);
        console.log('Update member response:', updateMember); 
        return res.json(updateMember);
    } catch (error) {
        console.log('Error updating movie:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
