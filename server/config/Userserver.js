    const express = require('express');
    const mongoose = require('mongoose');
    const loginUserControl = require('../controllers/LoginControl');
    const permissionsControl = require('../controllers/permissionsControl')
    const User = require('../models/UserModel');
    const createUser = require('../controllers/userControl');
    const CheckUsername =require('../controllers/CheckUsernameControl');
    const UsersData = require('../controllers/UsersDataControl');
    const deleteUser = require('../controllers/deleteUserControl');
    const updateUser = require('../controllers/UpdateUserDataControl');
    const addUser = require('../controllers/AddUserControl');
    const userPermission = require('../controllers/UserPermissionsControl');
    const editMovie = require('../controllers/EditMovieControl');
    
    
    const cors = require('cors');
    const port = 4000;
    const app = express();

    mongoose.connect('mongodb://127.0.0.1:27017/UserDB');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error:'));
    db.once('open', () => {
        console.log('Connected to UserDB');
    });

    app.use(express.json());
    app.use(cors({
        allowedHeaders: ["Content-Type", "Authorization"]
      }));


    app.use(loginUserControl);
    app.use('/permissions', permissionsControl);
    app.use( createUser);
    app.use( CheckUsername);
    app.use(UsersData);
    app.use(deleteUser);
    app.use(updateUser);
    app.use(addUser);
    app.use(userPermission);
    app.use(editMovie);



    app.get('/test', (req, res) => {
        res.send('Hello, this is a test route for User Server!');
    });

    app.listen(port, () => {
        console.log(`User server listening at http://localhost:${port}`);
    });
