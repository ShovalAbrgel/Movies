const express = require('express');
const router = express.Router();
const addMovieRepo  = require('../repositories/AddMovieRepo');


router.post('/addMovie', async (req, res) => {
    const obj = req.body;
    console.log(` add user route called`);
    try {
        const addMovie = await addMovieRepo.addMovie(obj);
        console.log('add user response:', addMovie); 

        return res.json(addMovie);

        
    } catch (error) {
        console.log('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
