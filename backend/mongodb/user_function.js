const mongoose = require('mongoose');

// Initialize the db
db = require("./connection");

// Define user model
const dbModel = require("./schema").GetuserModel;
const locationModel = require("./schema").GetvenueModel;

// Login by POST
exports.login = (req, res) => {
    // Get the user id
    let userid = req.body.userid;
    let password = req.body.password;

    // Find the user in the database
    dbModel.findOne({ userid: userid })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            if (user.password != password) {
                return res.status(404).json({
                    message: "Password is not correct"
                });
            }
            // Generate the token and send it 
            var gen_token = require('crypto').randomBytes(64).toString('hex');

            // Update the token in the database
            user.token = gen_token;
            user.save().then(() => {
                res.cookie(token, gen_token, { expire: 3600000 + Date.now() });  // expire in 1 hour
                res.cookie(userid, userid); // return the userid
                console.log("Login success!");
                res.json({
                    status: 200,
                    message: "Login success",
                    userid: user.userid,
                    username: user.username,
                    isAdmin: user.isAdmin,
                    token: user.token,
                });
            });

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            return res.status(500).json({
                message: "Error retrieving user with id " + userid
            });
        });
}

// Add or update the user data by userid
exports.addOrUpdateUser = (req, res) => {
    console.log(req.body);
    // Get the user id
    let userid = req.body.userid;
    let username = req.body.username;
    let password = req.body.password;
    let isAdmin = req.body.isAdmin;

    // Find the user in the database
    dbModel.findOne({ userid: userid })
        .then(user => {
            if (!user) {
                // set the userid as the max userid + 1
                dbModel.find().sort({ userid: -1 }).limit(1)
                    .then(user => {
                        let userid = user.userid + 1;
                        // Check input data
                        // if username is empty, give a default username
                        if (username == "") {
                            username = "user" + userid;
                        }
                        // if password is empty, give a default password
                        if (password == "") {
                            password = "123456";
                        }
                        if (isAdmin == "") {
                            isAdmin = false;
                        }
                        // Create a new user
                        let newUser = new dbModel({
                            userid: userid,
                            username: username,
                            password: password,
                            isAdmin: isAdmin,
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
                    })
            }
            else {
                // Check input data
                if (username == "") {
                    username = user.username;
                }
                if (password == "") {
                    password = user.password;
                }
                if (isAdmin == "") {
                    isAdmin = user.isAdmin;
                }
                user.username = username;
                user.password = password;
                user.isAdmin = isAdmin;
                user.save().then(() => {
                    res.status(200).json({
                        message: "User data updated."
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving users."
            });
        });

}

// Delete a user by userid by DELETE method
exports.deleteUser = (req, res) => {
    // Get the user id
    let userid = parseInt(req.body.id)

    // Find the user in the database
    dbModel.findOne({ userid: userid })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            // Delete the user in the database
            dbModel.deleteOne({ userid: userid })
                .then(() => {
                    res.status(200).json({
                        message: "User deleted."
                    });
                }).catch(err => {
                    res.status(500).json({
                        message: err.message || "Some error occurred while deleting the user."
                    });
                });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
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
    dbModel.findOne({ userid: userid })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            res.status(200).json(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
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
            res.status(200).json(users);
        }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
}

// Return the user favorite list by userid by get method
exports.getFavoriteList = (req, res) => {
    // Get the user id
    let userid = req.query['id'];

    // Find the user in the database
    dbModel.findOne({ userid: userid })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            res.json(user.favorite);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            return res.status(500).json({
                message: "Error retrieving user with id " + userid
            });
        });
}

// a dummy function for write the user favorite list by userid by get method
exports.writeFavoriteListByGet = (req, res) => {
    // Get the user id
    let userid = req.query['id'];
    let locid = req.query['locid'];

    // Find the user in the database
    dbModel.findOne({ userid: userid })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            // Check if the location is already in the favorite list
            for (let i = 0; i < user.favorite.length; i++) {
                if (user.favorite[i].locID == locid) {
                    return res.status(200).json({
                        message: "Location is already in the favorite list."
                    });
                }
            }
            // if the location is not in the favorite list, check the location is exist or not
            locationModel.find({ id: locid })
                .then(location => {
                    if (!location) {
                        return res.status(404).json({
                            message: "Location not found with id " + locid
                        });
                    }
                    // if the location is exist, add the location to the favorite list
                    user.favorite.push({
                        locID: locid,
                    });

                    user.save().then(() => {
                        res.status(200).json({
                            message: "Favorite list updated."
                        });
                    });
                })
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            return res.status(500).json({
                message: "Error retrieving user with id " + userid
            });
        });
}

// Write the user favorite list by userid by post method
exports.writeFavoriteList = (req, res) => {
    // Get the user id
    let userid = req.body.userid;
    let favorite = req.body.favorite;

    // Get the user token from cookie
    let token = req.cookies.token;

    // Find the user in the database
    dbModel.findOne({ userid: userid })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            if (user.token != token) {
                return res.status(401).json({
                    message: "Token is expired, plaese login again."
                });
            }
            user.favorite = favorite;
            user.save().then(() => {
                res.status(200).json({
                    message: "Favorite list updated."
                });
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            return res.status(500).json({
                message: "Error retrieving user with id " + userid
            });
        });
}

// Write the user comment by userid by get method
exports.writeCommentByGet = (req, res) => {
    // Get the user id
    let userid = req.query['id'];
    let locid = req.query['locid'];
    let comment = req.query['comment'];

    // Get the user token from cookie
    let token = req.cookies.token;

    // Find the user in the database
    dbModel.findOne({ userid: userid })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            if (user.token != token) {
                return res.status(401).json({
                    message: "Token is expired, plaese login again."
                });
            }
            // if the user is exist, find the location in the database
            locationModel.findOne({ id: locid })
                .then(location => {
                    if (!location) {
                        return res.status(404).json({
                            message: "Location not found with id " + locid
                        });
                    }
                    // if the location is exist, add the comment to the location
                    location.comments.push({
                        userID: user._id,
                        comment: comment,
                    });
                    location.save().then(() => {
                        res.status(200).json({
                            message: "Comment added."
                        });
                    });

                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).json({
                            message: "User not found with id " + userid
                        });
                    }
                    return res.status(500).json({
                        message: "Error retrieving user with id " + userid
                    });
                });
        });
}

// Write the user comment by userid by post method
exports.writeComment = (req, res) => {
    // Get the user id
    let userid = req.body.userid;
    let locid = req.body.locid;
    let comment = req.body.comment;

    // Get the user token from cookie
    let token = req.cookies.token;

    // Find the user in the database
    dbModel.findOne({ userid: userid })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found with id " + userid
                });
            }
            if (user.token != token) {
                return res.status(401).json({
                    message: "Token is expired, plaese login again."
                });
            }
            // if the user is exist, find the location in the database
            locationModel.findOne({ id: locid })
                .then(location => {
                    if (!location) {
                        return res.status(404).json({
                            message: "Location not found with id " + locid
                        });
                    }
                    // if the location is exist, add the comment to the location
                    location.comments.push({
                        userID: user._id,
                        comment: comment,
                    });
                    location.save().then(() => {
                        res.status(200).json({
                            message: "Comment added."
                        });
                    });

                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).json({
                            message: "User not found with id " + userid
                        });
                    }
                    return res.status(500).json({
                        message: "Error retrieving user with id " + userid
                    });
                });
        });
}

// Define the API for 