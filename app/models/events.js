var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var eventsSchema = new Schema({
  name:  String,
  description: String,
  date:   Date,
  url : String,
  host : {type : String, lowercase: true},
  price : String,
  capacity : Number,
  location : [{ street : String, 
              zip : String,
              city : String,
              state : String,
              latitude : Number,
              longitude : Number  }]
});

module.exports = mongoose.model('Events', eventsSchema);