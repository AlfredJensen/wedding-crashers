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
        var query = Event.where({ id: req.param.id });
        query.findOne(function (err, event) { 
            if (err) {
                //return handleError(err);
            }
            if (event) {
                // doc may be null if no document matched
                res.send(event);
            }
        }); 
    })
    app.get('/events/search/', function (req, res) {
        query.find(function (err, event) {
            if (err) {
                //return handleError(err);
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
        var query = Event.where(location.latitude).lte(req.param.lat + .035).gte(req.param.lat - .035).where(location.longitude).lte(req.param.longitude + .035).gte(req.param.longitude - .035);
        query.find(function (err, event) {
            if (err) {
                //return handleError(err);
            }
            if (event) {
                // doc may be null if no document matched
                res.send(event);
            }
        });
    })
    app.post('/events/create', function(req, res) {
        var eventInfo = new Event({ 
            name : req.body.name,
            description : req.body.description,
            date : req.body.date,
            price : req.body.price,
            url : req.body.url,
            host : req.body.host,
            capacity : req.body.capacity,
            location : [{ street : req.query.street, 
                    zip : req.query.zip,
                    city : req.query.city,
                    state : req.query.state,
                    latitude : req.query.latitude,
                    longitude : req.query.longitude }]
        });
        eventInfo.save(function(err) {
            if (err){
                //handle error
            }
            res.json({ message:'success', data:eventInfo});
        });
    });
}