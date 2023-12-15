// initial the cookie
const cookieParser = require('cookie-parser');

// init CORS
var express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Connect to MongoDB
const db = require("./mongodb/connection");


// Check the connection
db.once('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// process to the rounter page
require("./api")(app);

// simple route for testing
app.get("/", (req, res) => {
  res.json({ message: "Success enter to backend." });
});

// set the port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}.`);
});