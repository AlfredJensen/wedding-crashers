module.exports = function(app) {
    var mongoose = require('mongoose');
    Event = require('../models/events');

    var express = require('express');
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({
        extended : true
    }));
    app.use(bodyParser.json());


    app.get('/events/search/:id', function (req, res) {
        //Select top 1 from Event where Event.id = req.param.id
        var query = Event.where({ _id : req.params.id });
        query.findOne(function (err, event) { 
            if (err) {
                //return handleError(err);
                res.send("Everything broke, just ignore any success you might think you had");
            }
            if (event) {
                // doc may be null if no document matched
                res.send(event); 
            }
        }); 
    }) 
    app.get('/events/search/', function (req, res) {
        Event.find(function (err, event) {
            if (err) {
                //return handleError(err);
                res.send("Everything broke, just ignore any success you might think you had");
            }
            if (event) {
                // doc may be null if no document matched
                res.send(event);
            }
        }); 
    })
    app.get('/events/search/:lat/:longitude', function (req, res) {
        //select *  from Events where Events.location.latitude <= req.params.lat + .035   and 
        //                            Events.location.latitude >= req.params.lat - .035   and
        //                            Events.location.longitude <= req.params.long + .035 and
        //                            Events.location.longitude >= req.params.long - .035
        var query = Event.where('location.latitude').lte(req.params.lat + .035).gte(req.params.lat - .035).where('location.longitude').lte(req.params.longitude + .035).gte(req.params.longitude - .035);
        query.find(function (err, event) {
            if (err) {
                //return handleError(err);
                res.send(err);
            }
            if (event) {
                // doc may be null if no document matched
                res.send(event);
            }
        });
    })
    app.post('/events/create', function(req, res) {
        var locationJSON = req.body.location,
                obj = JSON.parse(locationJSON);
        var eventInfo = new Event({ 
            name : req.body.name,
            description : req.body.description,
            date : req.body.date,
            price : req.body.price,
            url : req.body.url,
            host : req.body.host,
            capacity : req.body.capacity,
            location : [{ street : obj.street, 
                    zip : obj.zip,
                    city : obj.city,
                    state : obj.state,
                    latitude : obj.latitude,
                    longitude : obj.longitude }]
        });
        eventInfo.save(function(err) {
            if (err){
                //handle error
            }
            res.json({ message:'success', data:eventInfo, console: req.body});
        });
    });
}