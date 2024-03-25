const express = require('express');
const router = express.Router();
const UsersRepo  = require('../repositories/UsersRepo');

router.get('/users', async (req, res) => {
    console.log('GET /users route called');
    try {
        const users = await UsersRepo.getAllUsers();
        return res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
