// Importing modules
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb://localhost:27017/projectDB');

// check connection
const db = mongoose.connection;

// return to the caller
module.exports = db;