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

// Create the event/update the event
exports.addOrUpdateEventByGetMethod = (req, res) => {
    // check the event id, if it is empty, create a new event
    if (!req.query['id']) {
        // set the event id to the max id + 1
        dbModel.find().sort({ eventid: -1 }).limit(1)
            .then(data => {
                // create the event
                const event = new dbModel({
                    eventid: data[0].eventid + 1,
                    title: req.query['title'],
                    desce: req.query['desce'],
                });
                event.save()
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: err.message || "Some error occurred while creating the event."
                        });
                    });
            });
    }
    // update the event

    // get the event id, event name, progtime, desce, presenterorge, price
    let id = req.query['id'];
    let title = req.query['title'];
    let desce = req.query['desce'];

    // find the event by id
    dbModel.findOne({ eventid: id })
        .then(event => {
            if (!event) {
                // create the event
                const event = new dbModel({
                    eventid: id,
                    title: title,
                    desce: desce,
                });
                event.save()
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: err.message || "Some error occurred while creating the event."
                        });
                    });
            } else {
                // update the event
                dbModel.updateOne({ eventid: id }, { title: title, desce: desce })
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: err.message || "Some error occurred while updating the event."
                        });
                    });
            }
        });
}

// Create the event/update the event by post method
exports.addOrUpdateEvent = (req, res) => {
    // check the event id, if it is empty, create a new event
    if (!req.body.id) {
        // set the event id to the max id + 1
        dbModel.find().sort({ eventid: -1 }).limit(1)
            .then(data => {
                // check the data is null or not
                if (req.body.title == null || req.body.title == "" || req.body.title == undefined) {
                    req.body.title = "TBD";
                }
                if (req.body.progtime == null || req.body.progtime == "" || req.body.progtime == undefined) {
                    req.body.progtime = "TBD";
                }
                if (req.body.venueid == null || req.body.venueid == "" || req.body.venueid == undefined) {
                    req.body.venueid = 100;
                }
                if (req.body.desce == null || req.body.desce == "" || req.body.desce == undefined) {
                    req.body.desce = "TBD";
                }
                // create the event
                const event = new dbModel({
                    eventid: data[0].eventid + 1,
                    title: req.query['title'],
                    desce: req.query['desce'],
                });
                event.save()
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: err.message || "Some error occurred while creating the event."
                        });
                    });
            });
    }

    // get the event id, event name, progtime, desce, presenterorge, price
    let id = req.body.id;
    let title = req.body.title;
    let progtime = req.body.progtime;
    let venueid = req.body.venueid;
    let desce = req.body.desce;
    let presenterorge = req.body.presenterorge;
    let price = req.body.price;

    // find the event by id
    dbModel.findOne({ eventid: id })
        .then(event => {
            if (!event) {
                // create the event
                // check the data is null or not
                if (title == null || title == "" || title == undefined) {
                    title = "TBD";
                }
                if (progtime == null || progtime == "" || progtime == undefined) {
                    progtime = "TBD";
                }
                if (venueid == null || venueid == "" || venueid == undefined) {
                    venueid = 100;
                }
                if (desce == null || desce == "" || desce == undefined) {
                    desce = "TBD";
                }
                if (presenterorge == null || presenterorge == "" || presenterorge == undefined) {
                    presenterorge = "TBD";
                }
                if (price == null || price == "" || price == undefined) {
                    price = "TBD";
                }
                const event = new dbModel({
                    eventid: id,
                    title: title,
                    desce: desce,
                    venueid: venueid,
                    progtime: progtime,
                    presenterorge: presenterorge,
                    price: price,
                });
                event.save()
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: err.message || "Some error occurred while creating the event."
                        });
                    });
            } else {
                // update the event
                // check the data is null or not
                if (title == null || title == "" || title == undefined) {
                    title = event.title;
                }
                if (progtime == null || progtime == "" || progtime == undefined) {
                    progtime = event.progtime;
                }
                if (venueid == null || venueid == "" || venueid == undefined) {
                    venueid = event.venueid;
                }
                if (desce == null || desce == "" || desce == undefined) {
                    desce = event.desce;
                }
                if (presenterorge == null || presenterorge == "" || presenterorge == undefined) {
                    presenterorge = event.presenterorge;
                }
                if (price == null || price == "" || price == undefined) {
                    price = event.price;
                }
                dbModel.updateOne({ eventid: id },
                    {
                        title: title,
                        desce: desce,
                        venueid: venueid,
                        progtime: progtime,
                        presenterorge: presenterorge,
                        price: price,
                    })
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: err.message || "Some error occurred while updating the event."
                        });
                    });
            }
        });
}

// Delete the event
exports.deleteEvent = (req, res) => {
    // check the event id
    if (!req.body.id) {
        return res.status(404).json({
            message: "Please provide the event id."
        });
    }

    let userid = parseInt(req.body.id)

    // find the event by id
    dbModel.findOne({ eventid: req.query['id'] })
        .then(event => {
            if (!event) {
                return res.status(404).json({
                    message: "Event not found with id " + req.query['id'] + "." + event
                });
            }
            // delete the event
            dbModel.deleteOne({ eventid: req.query['id'] })
                .then(data => {
                    res.json(data);
                })
                .catch(err => {
                    res.status(500).json({
                        message: err.message || "Some error occurred while deleting the event."
                    });
                });
        });
}