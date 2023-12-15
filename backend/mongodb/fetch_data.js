const mongoose = require('mongoose');

// get the database connection
db = require("./connection");

// get the model
const userModel = require("./schema").GetuserModel;
const eventModel = require("./schema").GeteventModel;
const venueModel = require("./schema").GetvenueModel;

// import xml2js Module 
let xmlParser = require('xml2json');

// fetch data from gov
exports.fetchData = (req, res) => {
// fetch data from gov
    // fetch the venue data first
    // data formate:
    // venues.venue[i].{id, venuec, venuee, latitude, longitude}
    const venuePromise = fetch('https://www.lcsd.gov.hk/datagovhk/event/venues.xml')
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

            // create a bulk operation for multiple inserts and update
            const bulkOps = items.map(item => ({
                updateOne: {
                    filter: { id: item.id }, // Assuming eventId is the field representing the unique id of an event
                    update: {
                        $set: {
                            name: item.name,
                            latitude: item.latitude,
                            longitude: item.longitude
                        }
                    },
                    upsert: true // Create a new event if it doesn't exist
                }
            }));

            // add the data into database
            venueModel.bulkWrite(bulkOps)
                .then(() => {
                    console.log("Fetch All venue added or updated!");
                })
                .catch(err => {
                    console.log("Error: " + err);
                });
        });

    // fetch the event data
    // data formate:
    // events.event[i].{...}
    const eventPromise = fetch('https://www.lcsd.gov.hk/datagovhk/event/events.xml')
        .then(response => response.text())
        .then(str => (xmlParser.toJson(str)))
        .then(data => {
            const eventsData = JSON.parse(data);

            // add the event data into database
            var items = eventsData.events.event.map((item) => {
                // preprocess the data (check null or undefined)
                // check the description
                if (Object.keys(item.desce).length === 0) {
                    item.desce = "To be confirmed";
                }
                // check the price
                if (Object.keys(item.pricee).length === 0) {
                    item.pricee = "To be confirmed";
                }

                // put it into model
                return new eventModel({
                    eventid: parseInt(item.id),
                    title: item.titlee,
                    venueid: parseInt(item.venueid),
                    progtime: item.predateE,
                    desce: item.desce,
                    presenterorge: item.presenterorge,
                    price: item.pricee
                });
            });

            // create a bulk operation for multiple inserts and update
            const bulkOps = items.map(item => ({
                updateOne: {
                    filter: { eventid: item.eventid }, // Assuming eventId is the field representing the unique id of an event
                    update: {
                        $set: {
                            title: item.title,
                            venueid: item.venueid,
                            progtime: item.progtime,
                            desce: item.desce,
                            presenterorge: item.presenterorge,
                            price: item.price
                        }
                    },
                    upsert: true // Create a new event if it doesn't exist
                }
            }));

            // add the data into database
            eventModel.bulkWrite(bulkOps)
                .then(() => {
                    console.log("All fetch event added or updated!");
                })
                .catch(err => {
                    console.log("Error: " + err);
                });
        });

    // wait two promise finish
    Promise.all([venuePromise, eventPromise]).then(() => {
        console.log("Fetch data finished!");
        res.status(200).json({
            message: "Fetch data finished!"
        });
    });
}
