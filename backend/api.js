// Return the request with the response
module.exports = app => {
const express = require('express');
const api = express.Router();

// For database collection function
const user = require("./mongodb/user_function.js");
const location = require("./mongodb/venue_function.js");
const event = require("./mongodb/event_function.js");
const fetchData = require("./mongodb/fetch_data.js");

// Define the routes for the API

// Definethe API route for getting a single user
api.get('/users', (req, res) => {res.json({ message: "Return a single user info: " + req.query['id'] });});

// Define the API route for getting all users
api.all('/users/all', user.getAllUsers);

// Definethe API to check the user is exist or not
api.get('/users/exist', (req, res) => {res.json({ message: "Return true if user exist: " + req.query['id'] });});

// Define the login API
api.post('/users/login', user.login);

// Definethe API for fetching data from gov
api.get('/users/login/success', fetchData.fetchData);

// ===== Location API =======

// Define the API for getting the location which have at least 3 events
api.get('/locations/find10', location.find10);

// ===== Event API =======
// Define the API for getting the number of events that host at given location id
api.get('/events/find/location', event.countEventByLocation);



// If api is not defined, return 404
api.get('/*', (req, res) => {
    res.json({ message: "404 not found." });
});

// Define the subdomain for calling api
app.use("/api", api);
}