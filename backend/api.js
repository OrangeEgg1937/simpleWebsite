const { get } = require('mongoose');

// Return the request with the response
module.exports = app => {
const express = require('express');
const api = express.Router();

// For database collection function
const user = require("./mongodb/user_function.js");
const location = require("./mongodb/venue_function.js");
const event = require("./mongodb/event_function.js");
const fetchData = require("./mongodb/fetch_data.js");

// ===== User API =======

// Definethe API route for getting a single user
api.get('/users', (req, res) => {res.json({ message: "Return a single user info: " + req.query['id'] });});

// Define the API route for getting all users
api.all('/users/all', user.getAllUsers);

// Definethe API to check the user is exist or not
api.get('/users/exist', (req, res) => {res.json({ message: "Return true if user exist: " + req.query['id'] });});

// Define the login API
api.post('/users/login', user.login);

// Define the API for fetching data from gov
api.get('/users/login/success', fetchData.fetchData);

// Define the API for getting the user favorite list by userid by get method
api.get('/users/favorite', user.getFavoriteList);

// Define the API for write the user favorite list by userid by post method
api.post('/users/favorite/write', user.writeFavoriteList);

// Define the API for write the comment by userid by post method
api.post('/users/comment/write', user.writeComment);

// Define the API for the dummy user comment
api.get('/users/comment', user.writeCommentByGet);

// Define the API for the add the dummy favorite list
api.get('/users/favorite/add', user.writeFavoriteListByGet);

// ===== Location API =======

// Define the API for getting the location which have at least 3 events
api.get('/locations/find10', location.find10);

// Define the API for return the location info by location id
api.get('/locations/find', location.getLocationInfo);

// Define the API for get the location comment by location id
api.get('/locations/comment', location.getLocationComment);

// ===== Event API =======
// Define the API for getting the number of events that host at given location id
api.get('/events/find/by/location', event.countEventByLocation);

// Define the API for getting the event info by event id
api.get('/events/find', event.getEventInfo);

// Deifne the API for getting the event which the 


// If api is not defined, return 404
api.get('/*', (req, res) => {
    res.json({ message: "404 not found." });
});

// Define the subdomain for calling api
app.use("/api", api);
}