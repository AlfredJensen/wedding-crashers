// Load Dependencies
var express = require('express');
var mongoose =  require('mongoose');

// Require some config modules
var db = require('./config/db');

// Link DB
mongoose.connect(db.url);

// Initialize the webserver
var app = express();

// To expose public assets to the world
app.use(express.static(__dirname + '/public'));

// API Routes
require('./app/routes/api-events.js')(app);
// Generic Routes
require('./app/routes/generic.js')(app);

// Start listening on 3000
app.listen(3000);