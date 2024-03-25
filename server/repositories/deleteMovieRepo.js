const Movie = require('../models/MoviesModel');

const deleteMovieyId = async (id) => {
  try {
    await Movie.findByIdAndDelete(id);
    console.log(`Movie with ID ${id} has been deleted`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {deleteMovieyId};
