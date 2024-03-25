    const express = require('express');
    const router = express.Router();
    const addUserRepo  = require('../repositories/AddUserRepo');
    const fs = require('fs');
    const path = require('path');

    router.post('/addUser', async (req, res) => {
        const obj = req.body;
        console.log(` add user route called`);
        try {
            const addUser = await addUserRepo.addUser(obj);
            console.log('add user response:', addUser); 

            const userId = obj.userId;
            const userDataJson = JSON.stringify(addUser);
            fs.writeFileSync(path.join(__dirname, '../dataJson', `${userId}.json`), userDataJson);

            return res.json(addUser);

            
        } catch (error) {
            console.log('Error updating user:', error);
            res.status(500).send('Internal Server Error');
        }
    });



    module.exports = router;
