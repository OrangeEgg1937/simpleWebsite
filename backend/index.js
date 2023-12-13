// Importing modules
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb://localhost:27017/testDB');

// check connection
const db = mongoose.connection;

db.once('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});