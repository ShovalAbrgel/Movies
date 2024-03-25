const express = require('express');
const router = express.Router();
const updateMovieRepo  = require('../repositories/EditMovieRepo');

router.put('/movies/:id', async (req, res) => {
    const { id } = req.params; 
    const obj = req.body;
    console.log(obj);
    console.log(`UPDATE /movies/${id} route called`);
    try {
        const updateMovie = await updateMovieRepo.updateMovieById(id, obj);
        console.log('Update movie response:', updateMovie); 
        return res.json(updateMovie);
    } catch (error) {
        console.log('Error updating movie:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
