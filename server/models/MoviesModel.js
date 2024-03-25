const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
  Name: String,
  Genres :[
    String
  ] ,
  Image: String,
  Premiered:Date
}, { versionKey: false , collection : 'Movies' });

const Movie = mongoose.model('Movie', MoviesSchema);

module.exports = Movie;
