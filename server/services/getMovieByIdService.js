const movieByIdRepo = require('../repositories/getMovieByIdRepo');

const getMovieById = async (movieid) => {
    try {
        const movie = await movieByIdRepo.getMovieById(movieid);
        return movie;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch member by ID');
    }
};

module.exports = { getMovieById };
