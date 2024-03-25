const Movie = require('../models/MoviesModel');

const getMovieById = async (movieid) => {
    try {
        const movie = await Movie.findById(movieid);
        return movie;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch member by ID');
    }
};

module.exports = { getMovieById };
