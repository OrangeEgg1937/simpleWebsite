const express = require('express');
const api = express.Router();

// Define the routes for the API
api.get('/api/users', (req, res) => {});

// Define the API route for getting a single user
api.get('/api/users/:id', (req, res) => {});

// Define the API to check the user is exist or not
api.get('/api/users/exist/:id', (req, res) => {});

api.get('/', (req, res) => {
    res.send('404 Not Found');
});