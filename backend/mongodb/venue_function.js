const mongoose = require('mongoose');

// Initialize the db
db = require("./connection");

// Define location model
const locationModel = require("./schema").GetvenueModel;

// Define event model
const eventModel = require("./schema").GeteventModel;

// Define user model
const userModel = require("./schema").GetuserModel;

// Get the location which have at least 3 events
exports.find10 = (req, res) => {
  locationModel.aggregate([
    {
      $lookup: {
        from: "events",
        localField: "id",
        foreignField: "venueid",
        as: "events",
      },
    },
    {
      $match: {
        "events.2": { $exists: true },
        latitude: { $ne: "N/A" },
      },
    },
    {
      $project: {
        comments: 1,
        longitude: 1,
        latitude: 1,
        name: 1,
        venue_id: "$id",
        _id: 0,
      },
    },
  ]).then(data => {
    // Take the first 10 locations
    data = data.slice(0, 10);
    res.status(200).json(data);
  });
}

// Get the location info by location id by get method
exports.getLocationInfo = (req, res) => {
  // get the location id
  console.log(req.query['id']);
  let id = req.query['id'];

  // find the location in the database
  locationModel.findOne({id: id})
  .then(location => {
    if(!location){
      return res.status(404).json({
        message: "Location not found with id " + id
      });
    }
    res.status(200).json(location);
  }).catch(err => {
    if(err.kind === 'ObjectId'){
      return res.status(404).json({
        message: "Location not found with id " + id
      });
    }
    return res.status(500).json({
      message: "Error retrieving location with id " + id
    });
  });
}

// Get the location comment by location id by get method
exports.getLocationComment = (req, res) => {
  // get the location id
  let locid = req.query['id'];
  console.log(locid);
  locationModel.find({id : locid})
  .populate('comments.userID')
  .then(data => {
    console.log(data);
    // get all the comments with new format
    // username and comment
    let comments = [];
    data.forEach(location => {
      location.comments.forEach(comment => {
        comments.push({
          username: comment.userID.username,
          comment: comment.comment,
        });
      });
    });
    res.status(200).json(comments);
  });
}