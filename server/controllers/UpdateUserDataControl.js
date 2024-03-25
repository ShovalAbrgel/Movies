const express = require('express');
const router = express.Router();
const updateUserRepo  = require('../repositories/updateUserDataRepo');

router.put('/users/:userId', async (req, res) => {
    const { userId } = req.params; 
    const obj = req.body;
    console.log(`UPDATE /users/${userId} route called`);
    try {
        const updateUser = await updateUserRepo.updateUserById(userId, obj);
        console.log('Update user response:', updateUser); 
        return res.json(updateUser);
    } catch (error) {
        console.log('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
