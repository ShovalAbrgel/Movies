const Movie = require('../models/MoviesModel');

const addMovie = async (movie) => {
   try{
    const addMovie = new Movie(movie);
    return await addMovie.save();
   }catch(error){
        console.log(error , "in the repo");
   }
};


module.exports = { addMovie };
