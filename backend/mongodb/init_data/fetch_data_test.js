const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testDB');

// check connection
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

// get the model
const userModel = require("../schema").GetuserModel;
const eventModel = require("../schema").GeteventModel;
const venueModel = require("../schema").GetvenueModel;

// import xml2js Module 
let xmlParser = require('xml2json');

// init data into database
connection.once('open', function () {
    console.log("MongoDB database connected successfully");

    // fetch data from gov
    // fetch the venue data first
    // data formate:
    // venues.venue[i].{id, venuec, venuee, latitude, longitude}
    fetch('https://www.lcsd.gov.hk/datagovhk/event/venues.xml')
        .then(response => response.text())
        .then(str => (xmlParser.toJson(str)))
        .then(data => {
            const venuesData = JSON.parse(data);

            // preprocess the data
            for (let i = 0; i < venuesData.venues.venue.length; i++) {
                // add the latitude and longitude
                if (Object.keys(venuesData.venues.venue[i].latitude).length === 0) {
                    venuesData.venues.venue[i].latitude = "N/A";
                }
                if (Object.keys(venuesData.venues.venue[i].longitude).length === 0) {
                    venuesData.venues.venue[i].longitude = "N/A";
                }
            }
            
            // add the venue data into database
            var items = venuesData.venues.venue.map((item) => {
                return new venueModel({
                    id: parseInt(item.id),
                    name: item.venuee,
                    latitude: item.latitude,
                    longitude: item.longitude
                });
            });

            // add the venue data into database
            venueModel.insertMany(items)
            .then(() => {
              console.log("items Added!");
            })
            .catch(err => {
                console.log("Error: " + err);
            });
        });

})