// Load Dependencies
var express = require('express');
var mongoose =  require('mongoose');

// Require some config modules
var db = require('./config/db');

// Link DB
mongoose.connect(db.url);

// Initialize the webserver
var app = express();


// A Really terrible route
app.get('/', function(req, res) {
	res.send('<h1> Test </h1>');
});

// Start listening on 3000
app.listen(3000);