const mongoose = require('mongoose');

// Initialize the db
db = require("./connection");

// Define event table
const Schema = mongoose.Schema({
    titlee: String, 
    venueid:Number, 
    progtimee:String, 
    desce:String, 
    presenterorge:String, 
    pricee:Number,
})
// Define event model
const dbModel = mongoose.model('event', Schema);

