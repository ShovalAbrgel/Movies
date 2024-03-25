const fs = require('fs');
const path = require('path');
const User = require('../models/UserModel');
const Permission = require('../models/PermissionModel');
const connectDB = require('../config/db');

const loadInitialData = async () => {
  connectDB();

  const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'Users.json')));
  await User.insertMany(usersData);

  const permissionsData = JSON.parse(fs.readFileSync(path.join(__dirname,'Permissions.json')));
  await Permission.insertMany(permissionsData);

  console.log('Initial data loaded successfully');
};

loadInitialData();
