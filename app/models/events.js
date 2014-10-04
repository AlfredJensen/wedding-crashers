var eventsSchema = new Schema({
  name:  String,
  description: String,
  date:   Date,
  url : String,
  host : String,
  date: { type: Date, default: Date.now },
  price : String,
  location : [{ street : String, 
              zip : Number,
              city : String,
              state : String  }]
});

module.exports = mongoose.model('Events', eventsSchema);