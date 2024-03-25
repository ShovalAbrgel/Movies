const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const SubscriptionsControl = require('../controllers/SubscriptionsControl');
const memberControl = require('../controllers/MembersControl');
const movieControl = require('../controllers/MoviesControl');
const Subscription = require('../models/SubscriptionsModel');
const deleteMovie = require('../controllers/deleteMovieControl');
const addMovie = require('../controllers/AddMovieControl');
const editMovie = require('../controllers/EditMovieControl');
const deleteMember = require('../controllers/deleteMemberControl');
const editMember = require('../controllers/EditMemberControl');
const addNewSub = require('../controllers/AddSubControl');
const addMember = require('../controllers/AddMemberControl');
const getMemberById = require('../controllers/getMemberByIdControl');
const getMovieById = require('../controllers/getMovieByIdControl');


const port = 5000;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/SubscriptionsDB');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => {
    console.log('Connected to SubscriptionsDB');
});

  
app.use(express.json());

app.use(cors({
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

app.use('/Subscriptions', SubscriptionsControl);
app.use( memberControl);
app.use( movieControl);
app.use( deleteMovie);
app.use(addMovie);
app.use(editMovie);
app.use(deleteMember);
app.use(editMember);
app.use(addNewSub);
app.use(addMember);
app.use(getMemberById);
app.use(getMovieById);


app.get('/test', (req, res) => {
    res.send('Hello, this is a test route for Subscription Server!');
});

app.listen(port, () => {
    console.log(`Subscription server listening at http://localhost:${port}`);
});
