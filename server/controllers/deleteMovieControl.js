const express = require('express');
const router = express.Router();
const deleteMovieRepo  = require('../repositories/deleteMovieRepo');

router.delete('/Movies/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`DELETE /movies/${id} route called`);
    try {
        const deleteMovies = await deleteMovieRepo.deleteMovieyId(id);
        return res.json(deleteMovies);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
