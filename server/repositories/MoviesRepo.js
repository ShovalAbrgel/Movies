const Movie = require('../models/MoviesModel');


const getAllMovies=()=>{
    return Movie.find({});
}

module.exports={getAllMovies}