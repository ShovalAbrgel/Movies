const express = require('express');
const router = express.Router();
const movieRepo = require('../repositories/getMovieByIdRepo');

router.get('/movies/:movieid', async (req, res) => {
    console.log('GET /movies/:movieid route called');
    try {
        const movieId = req.params.movieid;
        const movie = await movieRepo.getMovieById(movieId);
        res.json(movie);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
