const updateMovieRepo = require('../repositories/EditMovieRepo');

const updateMovieData = async (id,obj)=>{
    try{
        const updateMovie= await updateMovieRepo.updateMovieById({id,obj});
        return updateMovie;
    }catch(error){
        console.log(error);
    }
}

module.exports=updateMovieData;