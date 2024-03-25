const express = require('express');
const router = express.Router();
const UsersRepo  = require('../repositories/UserPermissionsRepo');

router.get('/userPermission', async (req, res) => {
    console.log('GET /users route called');
    try {
        const users = await UsersRepo.getAllUserData();
        return res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
