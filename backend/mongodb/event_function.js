const mongoose = require('mongoose');

// Initialize the db
db = require("./connection");

const dbModel = require("./schema").GeteventModel;
const locationModel = require("./schema").GetvenueModel;

// Get the number of events which host at given location id
exports.countEventByLocation = (req, res) => {
    if (!req.query['id']) {
        return res.status(404).json({
            message: "Please provide the location id."
        });
    }
    dbModel.countDocuments({ venueid: req.query['id'] })
        .then(data => {
            console.log(data.length);
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving the number of events."
            });
        });
}

// Return the event info by event id by get method
exports.getEventInfo = (req, res) => {
    // check the event id
    if (!req.query['id']) {
        return res.status(404).json({
            message: "Please provide the event id."
        });
    }

    // find event by id
    dbModel.findOne({ eventid: req.query['id'] })
        .then(event => {
            if (!event) {
                return res.status(404).json({
                    message: "Event not found with id " + req.query['id'] + "." + event
                });
            }
            res.status(200).json(event);
        });
}

// Return the event info which the location is equal to the top 10 by get method
// Get the location which have at least 3 events
exports.findeventwith10 = (req, res) => {
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
                _id: 0,
            },
        },
    ]).then(data => {
        // Take the first 10 locations
        venue_id_list = data.slice(0, 10);
        // convert the list to int array
        a_venue = venue_id_list.map(function (item) {
            return item.venue_id;
        });
        console.log(a_venue);
        // find the event by location id
        dbModel.find({ venueid: { $in: a_venue } })
            .then(event => {
                if (!event) {
                    return res.status(404).json({
                        message: "Event not found with id " + req.query['id'] + "." + event
                    });
                }
                res.status(200).json(event);
            });
    });
}