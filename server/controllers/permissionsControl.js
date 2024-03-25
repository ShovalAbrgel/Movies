const express = require('express');
const permissionsService = require('../services/permissionsService');

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('GET /grade route called');
    try {
        const permissions = await permissionsService.getAllPermissions();
        res.json(permissions);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports=router;