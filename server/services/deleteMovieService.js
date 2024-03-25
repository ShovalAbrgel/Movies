const deleteMovieRepo = require('../repositories/MoviesRepo');

const deleteMovie = async ()=>{
    try{
        const deletemovie = await deleteMovieRepo.deleteUserById({id});
        return deletemovie;
    }catch(error){
        console.log(error);
    }
}

module.exports={deleteMovie};