module.exports = function(app) {
    var mongoose = require('mongoose');
    Event = require('../models/events');

    app.get('/events/search/:id', function (req, res) {
        var query = Event.where({ id: req.params.id });
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
    app.get('/events/search/:lat/:long', function (req, res) {
        //select *  from Events where Events.location.latitude <= req.params.lat + .035   and 
        //                            Events.location.latitude >= req.params.lat - .035   and
        //                            Events.location.longitude <= req.params.long + .035 and
        //                            Events.location.longitude >= req.params.long - .035
        var query = Event.where('location.latitude').lte(req.params.lat + .035).gte(req.params.lat - .035)
        .lte(req.params.longitude + .035).gte(req.params.longitude - .035);
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
}