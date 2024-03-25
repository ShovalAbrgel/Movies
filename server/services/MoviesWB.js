const movieRepo = require('../repositories/MoviesRepo');

const getAllMovies = async ()=>{
    try{
        const movie = await movieRepo.getAllMovies();
        return movie;
    }catch(error){
        console.log(error);
    }
}

module.exports={getAllMovies};