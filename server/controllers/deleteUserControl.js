const express = require('express');
const router = express.Router();
const deleteUserRepo  = require('../repositories/deleteUserRepo');

router.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log(`DELETE /users/${userId} route called`);
    try {
        const deleteUser = await deleteUserRepo.deleteUserById(userId);
        return res.json(deleteUser);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
