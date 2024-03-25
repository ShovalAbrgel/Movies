const addMovieRepo = require('../repositories/AddMovieRepo');

const addMovie = async ()=>{
    try{
        const addMovie = await addMovieRepo.addMovie({movie});
        return addMovie;
    }catch(error){
        console.log(error,"in the service");
    }
}

module.exports={addMovie};