const express = require('express');
const router = express.Router();
const addMemberRepo  = require('../repositories/AddMemberRepo');


router.post('/addMember' ,  async (req,res)=>{
    const obj = req.body;
    try{
        const addNewMember = await addMemberRepo.addMember(obj);
        return res.json(addNewMember)
    }catch(error){
        console.log(error);
    }
})  

module.exports = router;

