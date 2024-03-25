const axios = require('axios');
const { MongoClient} = require('mongodb');

async function importMovies() {
  let client;

  try {
    const response = await axios.get('https://api.tvmaze.com/shows');
    const allMoviesData = response.data;

    const moviesData = allMoviesData.map(({ name, genres, image, premiered }) => ({
      Name: name,
      Genres: genres,
      Image: image ? image.medium : null, 
      Premiered: new Date(premiered),
    }));

    client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db('SubscriptionsDB');
    const moviesCollection = db.collection('Movies');
    await moviesCollection.insertMany(moviesData);

    console.log('Movies imported successfully');

  } catch (error) {
    console.error('Error importing movies:', error);

  } finally {
    if (client) {
      await client.close();
    }
  }
}

importMovies();
