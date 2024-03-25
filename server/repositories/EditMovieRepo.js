const Movie = require('../models/MoviesModel');

const updateMovieById= async (id, updatedData) => {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: id },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedMovie) {
      throw new Error(`Movie not found with ID: ${id}`);
    }

    return updatedMovie;
  } catch (error) {
    throw new Error(`Error updating movie: ${error.message}`);
  }
};

module.exports = {
    updateMovieById,
};


