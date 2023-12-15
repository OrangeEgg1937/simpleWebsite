const mongoose = require('mongoose');

// Initialize the db
db = require("./connection");

// Define user model
const dbModel = require("./schema").GetuserModel;

// Login by POST
exports.login = (req, res) => {
    // Get the user id
    let userid = req.body.userid;
    let password = req.body.password;

    // Find the user in the database
    dbModel.findOne({userid: userid})
    .then(user => {
        if(!user){
            return res.status(404).json({
                message: "User not found with id " + userid
            });
        }
        if(user.password != password){
            return res.status(404).json({
                message: "Password is not correct"
            });
        }
        // Generate the token and send it 
        var gen_token = require('crypto').randomBytes(64).toString('hex');
        
        // Update the token in the database
        user.token = gen_token;
        user.save().then(() => {
            res.cookie(token, gen_token, {expire: 3600000 + Date.now()});  // expire in 1 hour
            console.log("Login success!");
            res.json({
                status: 200,
                message: "Login success",
                token: user.token,
            });
        });

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