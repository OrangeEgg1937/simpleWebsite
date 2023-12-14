const mongoose = require('mongoose');

// Initialize the db
db = require("./connection");

// Define location table
const Schema = mongoose.Schema({
    name: String,
    latitude: Number,
    longtitude: Number
    },
)
// Define location model
const dbModel = mongoose.model('location', Schema);

