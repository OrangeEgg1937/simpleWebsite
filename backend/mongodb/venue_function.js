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
          venue_id: "$id",
          name: 1,
          latitude: 1,
          comments: 1,
        },
      },
    ]).then(data => {
        res.json(data);
    });
}