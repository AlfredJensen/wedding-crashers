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
        var query = Event.where({ location.latitude : req.params.lat, location.longitude : req.})
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