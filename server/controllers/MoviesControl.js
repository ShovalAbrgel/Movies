const express = require('express');
const movieService = require('../services/MoviesWB');

const router = express.Router();

router.get('/Movies', async (req, res) => {
    console.log('GET /grade route called');
    try {
        const movie = await movieService.getAllMovies();
        res.json(movie);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports=router;