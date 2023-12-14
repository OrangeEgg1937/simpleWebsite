const mongoose = require('mongoose');

// Define all the schemas

// Define user table
const userSchema = mongoose.Schema({
    userid: {
        type: Number,
        required: true,
        unique: true,
    },
    username: String,
    password: String,
    isAdmin: Boolean,
})
const userModel = mongoose.model('user', userSchema);

// Define event table
const eventSchema = mongoose.Schema({
    eventid: {
        type: Number,
        required: true,
        unique: true,
    },
    title: String, 
    venueid:{
        type: Number,
        ref: 'venue',
    }, 
    progtime:String, 
    desce:String, 
    presenterorge:String, 
    price:Number,
})
const eventModel = mongoose.model('event', eventSchema);

// Define location table
const venueSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: String,
    latitude: String,
    longitude: String
    },
)
const venueModel = mongoose.model('venue', venueSchema);

// export the schemas
exports.GetuserModel = userModel;
exports.GeteventModel = eventModel;
exports.GetvenueModel = venueModel;