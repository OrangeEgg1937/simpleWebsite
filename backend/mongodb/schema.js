const mongoose = require('mongoose');

// Define all the schemas

// Define user table
const userSchema = mongoose.Schema({
    userid: Number,
    username: String,
    password: String,
    isAdmin: Boolean,
})
const userModel = mongoose.model('User', userSchema);

// Define event table
const Schema = mongoose.Schema({
    title: String, 
    venueid:Number, 
    progtime:String, 
    desce:String, 
    presenterorge:String, 
    price:Number,
})
const eventModel = mongoose.model('event', Schema);

// Define location table
const locationSchema = mongoose.Schema({
    name: String,
    latitude: Number,
    longtitude: Number
    },
)
const locationModel = mongoose.model('location', locationSchema);

// export the schemas
exports.GetuserModel = () => {{return userModel}};
exports.GeteventModel = () => {{return eventModel}};
exports.GetlocationModel = () => {{return locationModel}};