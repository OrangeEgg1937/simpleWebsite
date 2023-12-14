const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/projectDB');

// check connection
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

// get the model
const userModel = require("../schema").GetuserModel;
const eventModel = require("../schema").GeteventModel;
const venueModel = require("../schema").GetvenueModel;

// init data into database
connection.once('open', function () {
    console.log("MongoDB database connected successfully");

    // create some users for testing
    const user1 = new userModel({
        userid: 1,
        username: "admin",
        password: "admin",
        isAdmin: true,
    });

    const user2 = new userModel({
        userid: 2,
        username: "user",
        password: "user",
        isAdmin: false,
    });

    // save the users
    user1.save()
    .then(() => {
        console.log("User1 added");
    }).catch(err => {
        console.log("Error adding user1");
    });

    user2.save()
    .then(() => {
        console.log("User2 added");
    }).catch(err => {
        console.log("Error adding user2");
    });
})