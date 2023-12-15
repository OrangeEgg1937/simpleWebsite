const mongoose = require('mongoose');

// Initialize the db
db = require("./connection");

// Define location model
const locationModel = require("./schema").GetvenueModel;

// Define event model
const eventModel = require("./schema").GeteventModel;

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
        res.json(data);
    });
}