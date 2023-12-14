const mongoose = require('mongoose');

// Initialize the db
db = require("./connection");

// Define user model
const dbModel = require("./schema").GetuserModel;

// Add a new user to the database
exports.adduser = (req, res) => {
    // Create a new user
    let newUser = new dbModel({
        userid: req.body.userid,
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    });

    // Save the user in the database
    newUser.save()
    .then(() => {
        res.json({
            message: err.message || "New user added"
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the user."
        });
    });
}

// Get a single user from the database
exports.getOneUserById = (req, res) => {
    // Get the user id
    let userid = req.query['id'];

    // Find the user in the database
    dbModel.findOne({userid: userid})
    .then(user => {
        if(!user){
            return res.status(404).json({
                message: "User not found with id " + userid
            });
        }
        res.json(user);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({
                message: "User not found with id " + userid
            });
        }
        return res.status(500).json({
            message: "Error retrieving user with id " + userid
        });
    });
}

// Get all users from the database
exports.getAllUsers = (req, res) => {
    // Find all users in the database
    dbModel.find()
    .then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
}