const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/projectDB');

// check connection
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

// init data into database
connection.once('open', function () {
    console.log("MongoDB database connected successfully");

})