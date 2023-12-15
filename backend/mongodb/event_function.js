const mongoose = require('mongoose');

// Initialize the db
db = require("./connection");

const dbModel = require("./schema").GeteventModel;

// Get the number of events which host at given location id
exports.countEventByLocation = (req, res) => {
    if(!req.query['id']){
        return res.status(404).json({
            message: "Please provide the location id."
        });
    }
    dbModel.countDocuments({venueid: req.query['id']})
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

